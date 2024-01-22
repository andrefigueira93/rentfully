import z from "zod";
// Imported the UserSchema to reuse the already defined fields
import { UserSchema } from "./user";

//  Pick the email and password fields from the UserSchema
export const SignInSchema = UserSchema.pick({ password: true, email: true });

// Extend the SignInSchema with the terms field
export const SignUpSchema = UserSchema.pick({
  firstName: true,
  lastName: true,
  email: true,
  password: true,
}).extend({
  terms: z.boolean().refine((val) => val, {
    message: "You must accept the terms and conditions",
  }),
});

// Exporting types for better type inference
export type SignInProps = z.infer<typeof SignInSchema>;
export type SignUpProps = z.infer<typeof SignUpSchema>;
