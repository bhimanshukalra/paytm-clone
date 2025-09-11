const zod = require("zod");
const { usernameSchema, firstNameSchema, lastNameSchema, passwordSchema } = require("./common");


const SignupSchema = zod.object({
    username: usernameSchema,
    firstName: firstNameSchema,
    lastName: lastNameSchema,
    password: passwordSchema,
});

const SigninSchema = zod.object({
    username: usernameSchema,
    password: passwordSchema,
});

module.exports = { SignupSchema, SigninSchema };