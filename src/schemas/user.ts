import z from "zod";

// User schema
export const UserSchema = z.object({
  id: z.number(),
  firstName: z
    .string()
    .min(2, "Minimum of 2 characters")
    .max(20, "Maximum of 20 characters"),
  lastName: z
    .string()
    .min(2, "Minimum of 2 characters")
    .max(20, "Maximum of 20 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6).max(20),
  avatar: z
    .string()
    .optional()
    .default(`https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`),
  confirmed: z.boolean(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().optional(),
});

// List Schema
export const ListUserSchema = z.array(UserSchema);

// While Creating, we don't need id, createdAt and updatedAt
export const CreateUserSchema = UserSchema.omit({
  id: true,
  confirmed: true,
  createdAt: true,
  updatedAt: true,
});
// While updating, we don't need createdAt, updatedAt and confirmed
export const UpdateUserSchema = UserSchema.partial().omit({
  confirmed: true,
  createdAt: true,
  updatedAt: true,
});

// Exporting types for better type inference
export type UserProps = z.infer<typeof UserSchema>;
export type ListUserProps = z.infer<typeof ListUserSchema>;
export type CreateUserProps = z.infer<typeof CreateUserSchema>;
export type UpdateUserProps = z.infer<typeof UpdateUserSchema>;
