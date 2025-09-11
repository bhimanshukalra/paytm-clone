const zod = require("zod");

const TransferSchema = zod.object({
  amount: zod.number().min(0, "Amount must be positive"),
  recipientUserId: zod.string().min(1, "Recipient User ID is required"),
});

module.exports = { TransferSchema };