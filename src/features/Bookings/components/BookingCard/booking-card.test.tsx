import * as BookingHook from "@/hooks/useBooking";
import { CompleteBookingProps } from "@/schemas/booking";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import BookingCard from "./index";
import { addDays } from "date-fns";

vi.mock("@/hooks/useBooking");

const mockBooking = {
  id: 1,
  userId: 1,
  propertyId: 1,
  property: {
    id: 1,
    image: "test-image.jpg",
    name: "Test Property",
    description: "Test Description",
    address: "Test Address",
    city: "Test City",
    state: "Test State",
    country: "Test Country",
    price: 100,
    extraGuestPrice: 50,
    maxGuests: 4,
    timesRented: 0,
    visible: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  checkIn: new Date(),
  checkOut: addDays(new Date(), 2),
  totalDays: 2,
  guests: 2,
  status: "Pending",
  finalPrice: 100,
  createdAt: new Date(),
} as CompleteBookingProps;

describe("BookingCard", () => {
  const mockDeleteBooking = vi.fn();
  const mockUpdateBooking = vi.fn();

  vi.spyOn(BookingHook, "useBooking").mockReturnValue({
    bookings: [],
    myBookings: [],
    deleteBooking: mockDeleteBooking,
    updateBooking: mockUpdateBooking,
    newBooking: vi.fn(),
  });

  it("renders booking information correctly", () => {
    render(<BookingCard booking={mockBooking} />);
    expect(screen.getByText(mockBooking.property.name)).toBeInTheDocument();
    expect(
      screen.getByText(mockBooking.property.description)
    ).toBeInTheDocument();
  });

  it("calls deleteBooking on delete button click", () => {
    render(<BookingCard booking={mockBooking} />);
    fireEvent.click(screen.getByText("Delete"));
    expect(mockDeleteBooking).toHaveBeenCalledWith(mockBooking.id);
  });

  it("calls updateBooking on confirm/cancel button click", () => {
    render(<BookingCard booking={mockBooking} />);
    fireEvent.click(screen.getByText("Confirm"));
    expect(mockUpdateBooking).toHaveBeenCalled();
  });
});
