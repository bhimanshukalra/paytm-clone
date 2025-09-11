const express = require("express");
const { SignupSchema } = require("../schemas");
const { User, Account } = require("../models");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { SigninSchema } = require("../schemas/signupSchema");
const { UserUpdateSchema, BulkSearchSchema } = require("../schemas/userSchema");
const { authMiddleware } = require("../middleware");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const isReqBodyValid = SignupSchema.safeParse(req.body).success;

    if (!isReqBodyValid) {
      return res.status(411).json({ error: "Invalid signup data" });
    }
    // Check if username is already taken
    const { username, password, firstName, lastName } = req.body;
    const isUserNameTaken = await User.findOne({ username });

    if (isUserNameTaken) {
      return res.status(411).json({ error: "Username already taken" });
    }
    // Create new user
    const newUser = await User.create({
      username,
      password,
      firstName,
      lastName,
    });

    await Account.create({ userId: newUser._id, balance: 1 + Math.random() * 1000 });

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET);
    return res
      .status(201)
      .json({ message: "User created successfully", token });
  } catch (err) {
    return res.status(500).json({ error: "Error creating user" });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const isReqBodyValid = SigninSchema.safeParse(req.body).success;

    if (!isReqBodyValid) {
      return res.status(411).json({ error: "Invalid signin data" });
    }
    // Check if username is already taken
    const { username, password } = req.body;
    const currentUser = await User.findOne({ username, password });

    if (!currentUser) {
      return res.status(411).json({ error: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: currentUser._id }, JWT_SECRET);
    return res.json({ message: "User signed in successfully", token });
  } catch (err) {
    return res.status(500).json({ error: "Error signing in user" });
  }
});

router.put("/", authMiddleware, async (req, res) => {
  const parsedReqBody = UserUpdateSchema.safeParse(req.body);

  if (!parsedReqBody.success) {
    return res
      .status(411)
      .json({ error: parsedReqBody?.error?.issues?.[0]?.message });
  }

  // Update user information
  const updatedUser = await User.findByIdAndUpdate(req.userId, req.body, {
    new: true,
  }).select("-password -__v -createdAt -updatedAt"); // Exclude sensitive fields

  return res.json({ message: "User updated successfully", user: updatedUser });
});

router.get("/bulk", authMiddleware, async (req, res) => {
  const parsedReqBody = BulkSearchSchema.safeParse(req.query);

  if (!parsedReqBody.success) {
    return res
      .status(411)
      .json({ error: parsedReqBody?.error?.issues?.[0]?.message });
  }

  const { filter } = req.query;

  const filteredUsers = await User.find({
    $or: [
      { firstName: { $regex: filter, $options: "i" } },
      { lastName: { $regex: filter, $options: "i" } },
      { username: { $regex: filter, $options: "i" } },
    ],
  }).select("-password -__v -createdAt -updatedAt"); // Exclude sensitive fields

  if (filteredUsers.length === 0) {
    return res.status(404).json({ error: "No users found" });
  }

  const userIds = filteredUsers.map((user) => user._id);
  const userAccounts = await Account.find({ userId: { $in: userIds } }).select("-__v -createdAt -updatedAt");

  const userWithAccount = filteredUsers.map((user) => {
    const account = userAccounts.find((acc) => acc.userId.toString() === user._id.toString());
    return {
      ...user.toObject(),
      balance: account?.balance || 0,
    };
  });

  return res.json({
    message: "Bulk user search successful",
    users: userWithAccount,
  });
});

module.exports = router;
