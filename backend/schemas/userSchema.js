const zod = require("zod");
const { firstNameSchema, lastNameSchema, passwordSchema } = require("./common");

const UserUpdateSchema = zod.object({
  firstName: firstNameSchema.optional(),
  lastName: lastNameSchema.optional(),
  password: passwordSchema.optional(),
});

const BulkSearchSchema = zod.object({
  filter: zod.string().min(1, "Filter cannot be empty"),
});

module.exports = { UserUpdateSchema, BulkSearchSchema };