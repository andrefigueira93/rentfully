import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import SectionTitle from "@/components/ui/section-title";
import CheckInFilter from "@/features/Properties/components/PropertyFilters/CheckInFilter";
import CheckOutFilter from "@/features/Properties/components/PropertyFilters/CheckOutFilter";
import FilterWrapper from "@/features/Properties/components/PropertyFilters/FilterWrapper";
import NumberOfGuestsFilter from "@/features/Properties/components/PropertyFilters/NumberOfGuestsFilter";
import { useBooking } from "@/hooks/useBooking";
import { formatCurrency } from "@/lib/utils";
import { newBookingAtom } from "@/store/bookings-store";
import { useAtomValue } from "jotai";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

const ConfirmBookingCard: React.FC = () => {
  const newBooking = useAtomValue(newBookingAtom);

  const { updateBooking } = useBooking();
  const navigate = useNavigate();

  const nights = useMemo(() => {
    if (newBooking?.totalDays === 1) return "night";
    return "nights";
  }, [newBooking]);

  function handleConfirmBooking() {
    if (!newBooking?.id) return;
    updateBooking({
      booking: {
        ...newBooking,
        status: "Confirmed",
        updatedAt: new Date(),
      },
    });
    navigate(`/my-bookings`);
  }

  return (
    <Card className="sm:sticky sm:top-5 border shadow-md rounded-lg">
      <CardHeader>
        <SectionTitle>Confirm your booking</SectionTitle>
      </CardHeader>
      <CardContent className="space-y-12">
        <CheckInFilter />
        <CheckOutFilter />
        <div className="flex flex-col">
          <NumberOfGuestsFilter />
          <p className="text-right mt-2">
            <strong className="mr-2">
              {formatCurrency(newBooking?.property?.extraGuestPrice)}
            </strong>
            per extra guest per night
          </p>
        </div>
        <FilterWrapper label={`Total for ${newBooking?.totalDays} ${nights}:`}>
          <strong className="w-full text-right text-xl font-black">
            {formatCurrency(newBooking?.finalPrice)}
          </strong>
        </FilterWrapper>
      </CardContent>
      <CardFooter>
        <Button onClick={handleConfirmBooking} className="w-full">
          Confirm booking
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ConfirmBookingCard;
