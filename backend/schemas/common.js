const zod = require("zod");

const usernameSchema = zod
  .string()
  .min(3, "Username must be at least 3 characters long")
  .max(30, "Username must be at most 30 characters long")
  .regex(
    /^[a-zA-Z0-9_]+$/,
    "Username can only contain letters, numbers, and underscores"
  );

const passwordSchema = zod
  .string()
  .min(6, "Password must be at least 6 characters long")
  .max(100, "Password must be at most 100 characters long");

const firstNameSchema = zod
  .string()
  .min(1, "First name is required")
  .max(50, "First name must be at most 50 characters long");

const lastNameSchema = zod
  .string()
  .min(1, "Last name is required")
  .max(50, "Last name must be at most 50 characters long");

module.exports = {
  usernameSchema,
  passwordSchema,
  firstNameSchema,
  lastNameSchema,
};
