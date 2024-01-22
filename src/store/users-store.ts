import { ListUserProps } from "@/schemas/user";
import { faker } from "@faker-js/faker";
import { subDays } from "date-fns";
import { atom } from "jotai";

// Users list atom with fake data
export const usersAtom = atom<ListUserProps>(
  Array.from({ length: 12 }, (_, i) => ({
    id: i,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    confirmed: true,
    password: faker.internet.password(),
    createdAt: subDays(new Date(), 1),
    updatedAt: new Date(),
  }))
);
