import { BookingProps, ListBookingProps } from "@/schemas/booking";
import { bookingFiltersAtom } from "@/store/booking-filters-store";
import {
  AuthUserBookingsAtomProps,
  authUserBookingsAtom,
  bookingsAtom,
} from "@/store/bookings-store";
import { addDays } from "date-fns";
import { useAtom, useAtomValue } from "jotai";
import React, { PropsWithChildren, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "./useAuth";

// Define the shape of the context
interface BookingContextData {
  bookings: Partial<ListBookingProps>;
  myBookings: AuthUserBookingsAtomProps;
  newBooking: (propertyId: number) => void;
  updateBooking: ({ booking }: { booking: Partial<BookingProps> }) => void;
  deleteBooking: (id: number) => void;
}
// Create a context with the default value of undefined
const BookingContext = createContext<BookingContextData | undefined>(undefined);

// Create a provider component that will expose the context
const BookingProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [bookings, setBookings] = useAtom(bookingsAtom);
  const myBookings = useAtomValue(authUserBookingsAtom);
  const filters = useAtomValue(bookingFiltersAtom);
  const { user } = useAuth();

  const navigate = useNavigate();

  function checkIfPropertyHaveBookingsInDates({
    propertyId,
    userId,
    checkIn,
    checkOut,
  }: {
    propertyId: number;
    userId?: number;
    checkIn?: Date;
    checkOut?: Date;
  }) {
    if (!checkIn || !checkOut) {
      toast("You should select a check-in and check-out date", {
        icon: <span className="text-2xl">😅</span>,
        important: true,
        position: "top-right",
      });

      if (typeof window !== "undefined") {
        throw new Error("You should select a check-in and check-out date");
      }

      return false;
    }

    const foundBookings = bookings.some(
      (item) =>
        item.propertyId === propertyId &&
        ((checkIn >= item.checkIn && checkIn <= item.checkOut) ||
          (checkOut >= item.checkIn && checkOut <= item.checkOut)) &&
        item.userId !== (userId ?? user?.id) &&
        item.status === "Confirmed"
    );

    if (foundBookings) {
      toast("This property is not available in the selected dates", {
        icon: <span className="text-2xl">😅</span>,
        important: true,
        position: "top-right",
      });

      if (typeof window !== "undefined") {
        throw new Error("This property is not available in the selected dates");
      }

      return false;
    }
    return true;
  }

  // While we don't have a backend, we will use this function to create a new booking
  // and add it to the bookings array with a fake id and createdAt date
  function newBooking(propertyId: number) {
    if (!user?.id) {
      toast("You should be authenticated to make a booking", {
        action: {
          label: "Sign in",
          onClick: () => navigate("/sign-in"),
        },
        cancel: {
          label: "Nevermind",
          onClick: () => toast.dismiss(),
        },
        icon: <span className="text-2xl">😅</span>,
        important: true,
        position: "top-right",
      });

      if (typeof window !== "undefined") {
        throw new Error("You should be authenticated to make a booking");
      }

      return;
    }

    const today = new Date();

    const checkAvailability = checkIfPropertyHaveBookingsInDates({
      propertyId,
      checkIn: filters.checkIn,
      checkOut: filters.checkOut,
    });

    if (!checkAvailability) {
      return;
    }

    setBookings((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        propertyId,
        userId: user.id!, // We know that user is not undefined because we checked it above
        status: "Pending",
        checkIn: filters.checkIn ?? today, // If checkIn is not defined, use today
        checkOut: filters.checkOut ?? addDays(today, 1), // If checkOut is not defined, use tomorrow
        guests: filters.numberOfGuests,
        createdAt: today,
      },
    ]);

    navigate("/new-booking");
  }

  // Function to update a booking with updatedAt date
  function updateBooking({ booking }: { booking: Partial<BookingProps> }) {
    const checkAvailability = checkIfPropertyHaveBookingsInDates({
      propertyId: booking.propertyId!,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
    });

    if (!checkAvailability) {
      return;
    }

    setBookings((prev) => {
      return prev.map((item) => {
        if (item.id === booking.id) {
          return {
            ...item,
            ...booking,
            updatedAt: new Date(),
          };
        }
        return item;
      });
    });
  }

  // Function to delete a booking
  function deleteBooking(id: number) {
    setBookings((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <BookingContext.Provider
      value={{
        bookings,
        myBookings,
        newBooking,
        deleteBooking,
        updateBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export default BookingProvider;

// Create a hook to use the BookingContext
export const useBooking = () => {
  const ctx = useContext(BookingContext);
  if (!ctx)
    throw new Error("`useBooking` must be used within a BookingProvider");
  return ctx;
};
