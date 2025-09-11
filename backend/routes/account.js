const express = require("express");
const { Account } = require("../models/account");
const { authMiddleware } = require("../middleware");
const { default: mongoose } = require("mongoose");
const { success } = require("zod");
const { TransferSchema } = require("../schemas/accountSchema");

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const currentUserAccount = await Account.findOne({ userId });

    const balance = currentUserAccount?.balance ?? 0;

    return res.json({ balance });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/transfer", authMiddleware, async (req, res) => {
  const { amount, recipientUserId } = req.body;
  const isReqBodyValid = TransferSchema.safeParse(req.body).success;

  if (!isReqBodyValid) {
    return res.status(411).json({ error: "Invalid transfer data" });
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // Fetch sender and recipient accounts
    const senderAccount = await Account.findOne({ userId: req.userId }).session(
      session
    );
    const recipientAccount = await Account.findOne({
      userId: recipientUserId,
    }).session(session);

    if (!senderAccount || !recipientAccount) {
      throw new Error("Sender or recipient account not found");
    }

    if (senderAccount.balance < amount) {
      throw new Error("Insufficient funds");
    }

    // Perform the transfer
    senderAccount.balance -= amount;
    recipientAccount.balance += amount;

    await senderAccount.save({ session });
    await recipientAccount.save({ session });

    await session.commitTransaction();
    session.endSession();

    return res.json({ message: "Transfer successful" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({ error: error.message || "Transfer failed" });
  }
});

module.exports = router;
