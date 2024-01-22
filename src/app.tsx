import Footer from "@/components/Footer";
import { Container } from "@/components/ui/container";
import { NavBar } from "@/components/ui/navbar";
import ScrollTopButton from "@/components/ui/scroll-top-button";
import AuthPage from "@/features/Auth/screen";
import HomePage from "@/features/Home/screen";
import LocationsPage from "@/features/Locations/screen";
import PropertiesPage from "@/features/Properties/screen";
import { AnimatePresence } from "framer-motion";
import { DevTools } from "jotai-devtools";
import "react-lazy-load-image-component/src/effects/blur.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import MyBookingsScreen from "./features/Bookings/MyBookingsScreen";
import NewBookingScreen from "./features/Bookings/NewBookingScreen";
import Providers from "./providers";

function PageRoutes() {
  // Get the current location to animate the page transitions
  // since the AnimatePresence animation is based on the key
  // we use the location pathname as the key
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/locations" element={<LocationsPage />} />
        <Route path="/sign-in" element={<AuthPage />} />
        <Route path="/new-booking" element={<NewBookingScreen />} />
        <Route path="/my-bookings" element={<MyBookingsScreen />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Providers>
        <Container padded>
          <NavBar />
          <PageRoutes />
          <ScrollTopButton />
          <Footer />
        </Container>
        <Toaster />
        <DevTools />
      </Providers>
    </BrowserRouter>
  );
}

export default App;
