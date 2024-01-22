import z from "zod";

// Property schema
export const PropertySchema = z.object({
  id: z.number(),
  name: z.string().min(3).max(20),
  address: z.string().min(5),
  city: z.string().min(3),
  state: z.string().min(3),
  country: z.string().min(3),
  description: z.string().min(5),
  price: z.number().positive().min(5),
  extraGuestPrice: z.number().positive().min(5),
  maxGuests: z.number().positive().min(1),
  image: z
    .string()
    .optional()
    .default(`https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`),
  visible: z.boolean(),
  timesRented: z.number().default(0),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().optional(),
});

// List Schema
export const ListPropertySchema = z.array(PropertySchema);

// While Creating, we don't need id, createdAt and updatedAt
export const CreatePropertySchema = PropertySchema.omit({
  id: true,
  timesRented: true,
  createdAt: true,
  updatedAt: true,
});

// While updating, we don't need createdAt and updatedAt
export const UpdatePropertySchema = PropertySchema.partial().omit({
  timesRented: true,
  createdAt: true,
  updatedAt: true,
});

// Exporting types for better type inference
export type PropertyProps = z.infer<typeof PropertySchema>;
export type ListPropertyProps = z.infer<typeof ListPropertySchema>;
export type CreatePropertyProps = z.infer<typeof CreatePropertySchema>;
export type UpdatePropertyProps = z.infer<typeof UpdatePropertySchema>;
