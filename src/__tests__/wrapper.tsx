import Providers from "@/providers";
import { PropsWithChildren } from "react";
import { MemoryRouter } from "react-router";

export default function TestWrapper({ children }: PropsWithChildren) {
  return (
    <MemoryRouter>
      <Providers>{children}</Providers>
    </MemoryRouter>
  );
}
