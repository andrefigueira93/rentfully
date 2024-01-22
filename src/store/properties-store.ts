import { ListPropertyProps } from "@/schemas/property";
import { faker } from "@faker-js/faker";
import { atom } from "jotai";
import { numberOfGuestsFilterAtom } from "./booking-filters-store";
import { bookingsAtom } from "./bookings-store";

// Properties list atom with fake data
export const propertiesAtom = atom<ListPropertyProps>(
  Array.from({ length: 64 }, (_, i) => ({
    id: i + 1,
    name: `${faker.company.name()} Hotel`,
    address: faker.location.city(),
    city: faker.location.city(),
    state: faker.location.state(),
    country: faker.location.country(),
    description: faker.lorem.paragraph(1),
    price: faker.number.int({ min: 50, max: 500 }),
    extraGuestPrice: faker.number.int({ min: 10, max: 50 }),
    maxGuests: faker.number.int({ min: 1, max: 10 }),
    timesRented: faker.number.int({ min: 0, max: 100 }),
    image: faker.image.urlLoremFlickr({
      category: "vacations",
    }),
    visible: Math.random() > 0.5 ? true : false,
    createdAt: new Date(),
    updatedAt: new Date(),
  }))
);

// Min and max price of the properties
export const minMaxPriceAtom = atom((get) => {
  const properties = get(propertiesAtom);
  const guests = get(numberOfGuestsFilterAtom);
  const prices = properties.map((property) => {
    if (guests > 1) {
      return property.price + property.extraGuestPrice * (guests - 1);
    }
    return property.price;
  });

  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
});

// Visible properties
export const visiblePropertiesAtom = atom((get) => {
  const properties = get(propertiesAtom);
  return properties.filter((property) => property.visible);
});

// Max guests of the properties
export const maxGuestsAtom = atom((get) => {
  const properties = get(visiblePropertiesAtom);
  const maxGuests = properties.map((property) => property.maxGuests);
  return Math.max(...maxGuests);
});

// Properties by city
export const propertiesByCityAtom = atom((get) => {
  const properties = get(visiblePropertiesAtom);
  const cities = properties.map((property) => property.city);
  return [...new Set(cities)];
});

// Popular properties are the ones that have been
// rented more than 80 times
export const popularPropertiesAtom = atom((get) => {
  const properties = get(visiblePropertiesAtom);
  return properties
    .filter((property) => property.timesRented > 80)
    .sort((a, b) => b.timesRented - a.timesRented);
});

// Unique locations are the cities
export const uniqueLocationsAtom = atom((get) => {
  const properties = get(visiblePropertiesAtom);
  const uniqueLocationsWithImage = properties
    .map((property) => property.city)
    .filter((city, index, self) => self.indexOf(city) === index)
    .map((city) => properties.find((property) => property.city === city));
  return uniqueLocationsWithImage;
});

// Properties with bookings
export const propertiesWithBookingsAtom = atom((get) => {
  const bookings = get(bookingsAtom);
  const properties = get(visiblePropertiesAtom);

  return properties.map((property) => ({
    ...property,
    bookings: bookings.filter((booking) => booking.propertyId === property.id),
  }));
});

// Top locations are the cities where the properties have been
// rented more than 70 times
export const topLocationsAtom = atom((get) => {
  const properties = get(uniqueLocationsAtom);
  const topLocations = properties.filter(
    (property) => property?.timesRented && property.timesRented > 70
  );
  return topLocations;
});

// Exporting types for better type inference
export type TopLocationsAtomType = ReturnType<
  (typeof topLocationsAtom)["read"]
>;
export type PopularPropertiesAtomType = ReturnType<
  (typeof popularPropertiesAtom)["read"]
>;
export type UniqueLocationsAtomType = ReturnType<
  (typeof uniqueLocationsAtom)["read"]
>;
export type PropertiesWithBookingsAtomType = ReturnType<
  (typeof propertiesWithBookingsAtom)["read"]
>;
