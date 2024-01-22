import { baseUser } from "@/__tests__/test-constants";
import {
  AUTH_REGISTERED_USERS,
  AUTH_TOKEN_NAME,
} from "@/infrastructure/constants";
import { ListUserProps } from "@/schemas/user";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const authMethodAtom = atom<"signin" | "signup">("signin");

export const authUserAtom = atomWithStorage<Partial<
  ListUserProps[number]
> | null>(AUTH_TOKEN_NAME, null);

export const registeredUsersAtom = atomWithStorage<
  Partial<ListUserProps[number]>[]
>(AUTH_REGISTERED_USERS, [baseUser]);
