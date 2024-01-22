import AnimatedView from "@/components/ui/animated-view";
import PageTitle from "@/components/ui/page-title";
import { useAuth } from "@/hooks/useAuth";
import { CompleteBookingProps } from "@/schemas/booking";
import { authUserBookingsAtom } from "@/store/bookings-store";
import { useAtomValue } from "jotai";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookingCard from "../components/BookingCard";

const MyBookingsScreen: React.FC = () => {
  const myBookings = useAtomValue(authUserBookingsAtom);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/sign-in");
    }
  }, [isAuthenticated]);

  return (
    <AnimatedView>
      <PageTitle title="My Bookings" />
      <div className="max-w-3xl mx-auto space-y-6">
        {myBookings.map((booking) => (
          <BookingCard
            key={booking?.id}
            booking={booking as CompleteBookingProps}
          />
        ))}
      </div>
    </AnimatedView>
  );
};

export default MyBookingsScreen;
