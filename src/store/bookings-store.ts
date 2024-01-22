import { ListBookingProps, NewBookingProps } from "@/schemas/booking";
import { differenceInDays } from "date-fns";
import { atom } from "jotai";
import { authUserAtom } from "./auth-store";
import { bookingFiltersAtom } from "./booking-filters-store";
import { propertiesAtom } from "./properties-store";
import { usersAtom } from "./users-store";

// Bookings store
export const bookingsAtom = atom<ListBookingProps>([
  {
    id: 1,
    userId: 1,
    propertyId: 1,
    checkIn: new Date(),
    checkOut: new Date(),
    status: "Pending",
    guests: 1,
    finalPrice: 200,
    totalDays: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]);

// Bookings by user
export const bookingsByUserAtom = atom((get) => {
  const bookings = get(bookingsAtom);
  const users = get(usersAtom);

  return users.map((user) => ({
    ...user,
    bookings: bookings.filter((booking) => booking.userId === user.id),
  }));
});

// Auth user bookings
export const authUserBookingsAtom = atom((get) => {
  const bookings = get(bookingsAtom);
  const user = get(authUserAtom);
  const properties = get(propertiesAtom);

  return bookings
    .filter((booking) => booking.userId === user?.id)
    .map((booking) => ({
      ...booking,
      property: properties.find(
        (property) => property.id === booking.propertyId
      ),
      user,
    }));
});

// Computed new booking with props to show in the booking
/**
 * Represents an atom that holds the state of a new booking.
 * @returns The new booking object with additional properties like property, finalPrice, and totalDays.
 */
export const newBookingAtom = atom<NewBookingProps | null>((get) => {
  const authBookings = get(authUserBookingsAtom);
  const properties = get(propertiesAtom);
  const filters = get(bookingFiltersAtom);

  const newBooking = authBookings
    .filter((booking) => booking.status === "Pending")
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )[0];

  if (!newBooking) {
    return null;
  }

  const property = properties.find(
    (property) => property.id === newBooking.propertyId
  );

  if (!property) {
    return null;
  }

  const totalDays = differenceInDays(
    new Date(filters?.checkOut ?? newBooking.checkOut),
    new Date(filters?.checkIn ?? newBooking.checkIn)
  );

  // The calculus is the price of the property
  // plus the extra guest price times the number of guests
  // minus one, due to the first guest is the main price
  const priceWithGuests =
    property.price + property.extraGuestPrice * (filters.numberOfGuests - 1);

  const finalPrice = totalDays * priceWithGuests;

  return {
    ...newBooking,
    property,
    finalPrice,
    totalDays,
  };
});

// Confirmed bookings are the ones that are confirmed
export const confirmedBookingsAtom = atom((get) => {
  const bookings = get(bookingsAtom);
  return bookings.filter((booking) => booking.status === "Confirmed");
});

// Pending bookings are the ones that are not confirmed
export const pendingBookingsAtom = atom((get) => {
  const bookings = get(bookingsAtom);
  return bookings.filter((booking) => booking.status === "Pending");
});

// Canceled bookings are the ones that are canceled
export const canceledBookingsAtom = atom((get) => {
  const bookings = get(bookingsAtom);
  return bookings.filter((booking) => booking.status === "Cancelled");
});
