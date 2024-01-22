import z from "zod";
import { PropertyProps, PropertySchema } from "./property";

export const BookingSchema = z.object({
  id: z.number(),
  checkIn: z
    .date({
      invalid_type_error: "Invalid date format",
      required_error: "Check-in date is required",
      description: "Check-in date",
    })
    .min(new Date(), "Check-in date must be in the future"),
  checkOut: z.date({
    invalid_type_error: "Invalid date format",
    required_error: "Check-out date is required",
    description: "Check-out date",
  }),
  finalPrice: z.number().optional(),
  totalDays: z.number().optional(),
  propertyId: z.number().refine((val) => val, "Property is required"),
  userId: z.number().refine((val) => val, "User is required"),
  guests: z.number().int().min(1, "At least one guest is required"),
  status: z.enum(["Pending", "Confirmed", "Cancelled"]).default("Pending"),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().optional(),
});

export const CompleteBookingSchema = BookingSchema.extend({
  property: PropertySchema,
});

export const ListBookingSchema = z.array(BookingSchema);
export const CreateBookingSchema = BookingSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const UpdateBookingSchema = BookingSchema.partial().omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Exporting types for better type inference
export type BookingProps = z.infer<typeof BookingSchema>;
export type ListBookingProps = z.infer<typeof ListBookingSchema>;
export type CreateBookingProps = z.infer<typeof CreateBookingSchema>;
export type UpdateBookingProps = z.infer<typeof UpdateBookingSchema>;
export type CompleteBookingProps = z.infer<typeof CompleteBookingSchema>;
export type NewBookingProps = CreateBookingProps & {
  id: number;
  property?: PropertyProps;
};
