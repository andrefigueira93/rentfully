import AuthProvider from "@/hooks/useAuth";
import BookingProvider from "@/hooks/useBooking";
import ScrollPositionProvider from "@/hooks/useScrollPosition";
import { ThemeProvider } from "@/hooks/useTheme";
import React, { PropsWithChildren } from "react";
import QueryProvider from "./query-provider";

// Root provider component
const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ScrollPositionProvider>
      <ThemeProvider>
        <AuthProvider>
          <QueryProvider>
            <BookingProvider>{children}</BookingProvider>
          </QueryProvider>
        </AuthProvider>
      </ThemeProvider>
    </ScrollPositionProvider>
  );
};

export default Providers;
