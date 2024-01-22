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
import {
  BanknotesIcon,
  MapPinIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { MoonIcon } from "@radix-ui/react-icons";
import { useMemo } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import UpdateBookingDialog from "../UpdateBookingDialog";

interface BookingCardProps {
  booking: CompleteBookingProps;
}

// Booking card component
// Displays a booking and allows to update or delete it
function BookingCard({ booking }: BookingCardProps) {
  const { deleteBooking, updateBooking } = useBooking();

  const { myBookings } = useBooking();

  const currentBooking = useMemo(() => {
    return myBookings.find((b) => b?.id === booking?.id);
  }, [booking, myBookings]);

  const nights = useMemo(
    () => (currentBooking?.totalDays ?? 0 > 1 ? "night" : "nights"),
    [currentBooking?.totalDays]
  );

  const guests = useMemo(
    () => (currentBooking?.guests ?? 1 > 1 ? "guests" : "guest"),
    [currentBooking?.guests]
  );

  const confirmed = useMemo(
    () => booking?.status === "Confirmed",
    [booking?.status]
  );

  const fullAddress = useMemo(() => {
    if (!booking?.property) return "";
    return `${booking?.property?.address}, ${booking?.property?.city}, ${booking?.property?.state} - ${booking?.property?.country}`;
  }, [booking?.property]);

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
          <Badge className="h-max justify-center ml-auto my-2 sm:my-0">
            {currentBooking?.status}
          </Badge>
          <CardTitle>{booking?.property?.name}</CardTitle>
          <CardDescription>
            {humanDate(currentBooking?.checkIn)} -{" "}
            {humanDate(currentBooking?.checkOut)}
          </CardDescription>
          <div className="flex items-center mb-3 text-sm dark:text-gray-300 mt-2">
            <MapPinIcon className="w-5 h-5 mr-1 shrink-0" />
            <p>{fullAddress}</p>
          </div>
          <p>{booking?.property?.description}</p>

          <div className="grid grid-cols-3 mt-5 md:mt-auto gap-4 justify-evenly">
            <p className="flex">
              <UserIcon className="w-5 h-5 mr-1" />
              {currentBooking?.guests} {guests}
            </p>
            <p className="flex">
              <MoonIcon className="w-5 h-5 mr-1" />
              {currentBooking?.totalDays} {nights}
            </p>
            <p className="flex">
              <BanknotesIcon className="w-5 h-5 mr-1" />
              {formatCurrency(currentBooking?.finalPrice)}
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
}

export default BookingCard;
