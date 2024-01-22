import { atomWithStorage } from "jotai/utils";

export const themeAtom = atomWithStorage<"dark" | "light" | "system">(
  "rentfully-theme",
  "system"
);
