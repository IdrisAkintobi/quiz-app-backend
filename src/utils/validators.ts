import { z } from "zod";

//Password validator regex pattern & error message
const PasswordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[#?!@$%^&*-]).{8,}$/;
const PasswordError =
  "Password must be at least 8 character, include uppercase, lowercase, digit and special character.";

//Signup validator
const SignUpValidator = z
  .object({
    email: z.string().email({ message: "Enter valid email" }),
    password: z.string().regex(PasswordRegex, { message: PasswordError }),
    confirmPassword: z.string().regex(PasswordRegex),
  })
  .strict()
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

//Sign in Validator
const SignInValidator = z
  .object({
    email: z.string().email({ message: "Enter valid email" }),
    password: z.string(),
  })
  .strict();

export { SignUpValidator, SignInValidator };
