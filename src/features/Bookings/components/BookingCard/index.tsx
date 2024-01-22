import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useBooking } from "@/hooks/useBooking";
import { formatCurrency, humanDate } from "@/lib/utils";
import { CompleteBookingProps } from "@/schemas/booking";
import { BanknotesIcon, UserIcon } from "@heroicons/react/24/outline";
import { MoonIcon } from "@radix-ui/react-icons";
import React, { useMemo } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import UpdateBookingDialog from "../UpdateBookingDialog";

// Booking card component
// Displays a booking and allows to update or delete it
const BookingCard: React.FC<{
  booking: CompleteBookingProps;
}> = ({ booking }) => {
  const { deleteBooking, updateBooking } = useBooking();

  const nights = useMemo(
    () => (booking?.totalDays ?? 0 > 1 ? "night" : "nights"),
    [booking?.totalDays]
  );

  const guests = useMemo(
    () => (booking?.guests > 1 ? "guests" : "guest"),
    [booking?.guests]
  );

  const confirmed = useMemo(
    () => booking?.status === "Confirmed",
    [booking?.status]
  );

  function handleDeleteBooking() {
    if (!booking?.id) return;
    deleteBooking(booking?.id);
  }

  function handleCancelBooking() {
    if (!booking?.id) return;
    updateBooking({
      booking: {
        ...booking,
        status: "Cancelled",
      },
    });
  }

  function handleConfirmBooking() {
    if (!booking?.id) return;
    updateBooking({
      booking: {
        ...booking,
        status: "Confirmed",
      },
    });
  }

  return (
    <Card className="flex flex-col justify-between border p-6 rounded-lg">
      <CardHeader className="flex flex-col sm:flex-row">
        <LazyLoadImage
          src={booking?.property?.image}
          effect="blur"
          className="rounded-xl sm:mr-4 sm:max-w-[250px]"
        />
        <div className="flex flex-col w-full">
          <Badge className="h-max justify-center ml-auto">
            {booking?.status}
          </Badge>
          <CardTitle>{booking?.property?.name}</CardTitle>
          <CardDescription>
            {humanDate(booking?.checkIn)} - {humanDate(booking?.checkOut)}
          </CardDescription>
          <p>{booking?.property?.description}</p>

          <div className="grid grid-cols-3 mt-5 md:mt-auto gap-4 justify-evenly">
            <p className="flex">
              <UserIcon className="w-5 h-5 mr-1" />
              {booking?.guests} {guests}
            </p>
            <p className="flex">
              <MoonIcon className="w-5 h-5 mr-1" />
              {booking?.totalDays} {nights}
            </p>
            <p className="flex">
              <BanknotesIcon className="w-5 h-5 mr-1" />
              {formatCurrency(booking?.finalPrice)}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardFooter className="grid grid-cols-3 gap-4 justify-end">
        {!confirmed && (
          <Button onClick={handleDeleteBooking} variant="destructive">
            Delete
          </Button>
        )}
        {confirmed ? (
          <Button onClick={handleCancelBooking} variant="destructive">
            Cancel
          </Button>
        ) : (
          <Button onClick={handleConfirmBooking}>Confirm</Button>
        )}
        <UpdateBookingDialog id={booking?.id} />
      </CardFooter>
    </Card>
  );
};

export default BookingCard;
