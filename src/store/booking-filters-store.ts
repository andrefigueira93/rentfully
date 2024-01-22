import { addDays } from "date-fns";
import { atom } from "jotai";
import { propertiesWithBookingsAtom } from "./properties-store";

const today = new Date();

// We're gonna use these atoms to store the user's search filters.
export const locationFilterAtom = atom<string | undefined>(undefined);
export const checkInFilterAtom = atom<Date | undefined>(today);
export const checkOutFilterAtom = atom<Date | undefined>(addDays(today, 1));
export const numberOfGuestsFilterAtom = atom<number>(1);
export const maxPriceFilterAtom = atom<number | undefined>(undefined);

// Interface to define the search filters.
interface BookingFilters {
  location?: string;
  checkIn?: Date;
  checkOut?: Date;
  numberOfGuests?: number;
  maxPrice?: number;
}

// Custom atom to store the search filters.
// and manipulate them.
export const bookingFiltersAtom = atom(
  (get) => ({
    location: get(locationFilterAtom),
    checkIn: get(checkInFilterAtom),
    checkOut: get(checkOutFilterAtom),
    numberOfGuests: get(numberOfGuestsFilterAtom),
    maxPrice: get(maxPriceFilterAtom),
  }),
  (
    _get,
    set,
    update: {
      location?: string;
      checkIn?: Date;
      checkOut?: Date;
      numberOfGuests?: number;
      maxPrice?: number;
    }
  ) => {
    const { location, checkIn, checkOut, numberOfGuests, maxPrice } =
      update as Partial<BookingFilters>;

    if (location) {
      set(locationFilterAtom, location);
    }

    if (checkIn) {
      set(checkInFilterAtom, checkIn);
    }

    if (checkOut) {
      set(checkOutFilterAtom, checkOut);
    }

    if (numberOfGuests) {
      set(numberOfGuestsFilterAtom, numberOfGuests);
    }

    if (maxPrice) {
      set(maxPriceFilterAtom, maxPrice);
    }
  }
);

// Custom atom to give us a computed search based on the filters.
// Since it's purpose is to be read-only, we don't need to pass
// a setter function.
export const filteredPropertiesAtom = atom((get) => {
  const properties = get(propertiesWithBookingsAtom);
  const { location, checkIn, checkOut, numberOfGuests, maxPrice } =
    get(bookingFiltersAtom);

  return properties.filter((property) => {
    if (location && property.city?.toLowerCase() !== location) {
      return false;
    }

    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);

      const propertyBookings = property.bookings.filter((booking) => {
        const bookingCheckInDate = new Date(booking.checkIn);
        const bookingCheckOutDate = new Date(booking.checkOut);

        return (
          (bookingCheckInDate >= checkInDate &&
            bookingCheckInDate <= checkOutDate) ||
          (bookingCheckOutDate >= checkInDate &&
            bookingCheckOutDate <= checkOutDate)
        );
      });

      if (propertyBookings.length > 0) {
        return false;
      }
    }

    if (numberOfGuests && property.maxGuests < numberOfGuests) {
      return false;
    }

    if (maxPrice && property.price > maxPrice) {
      return false;
    }

    return true;
  });
});
