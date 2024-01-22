import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBooking } from "@/hooks/useBooking";
import { calculateFinalPrice, formatCurrency } from "@/lib/utils";
import { authUserBookingsAtom } from "@/store/bookings-store";
import { differenceInDays } from "date-fns";
import { atom, useAtom, useAtomValue } from "jotai";
import React, { useMemo } from "react";

interface UpdateBookingDialogProps {
  id: number;
}

const checkInDateAtom = atom<Date | undefined>(new Date());
const checkOutDateAtom = atom<Date | undefined>(new Date());
const guestsAtom = atom<number>(1);

const UpdateBookingDialog: React.FC<UpdateBookingDialogProps> = ({ id }) => {
  const bookings = useAtomValue(authUserBookingsAtom);

  const [checkInDate, setCheckInDate] = useAtom(checkInDateAtom);
  const [checkOutDate, setCheckOutDate] = useAtom(checkOutDateAtom);
  const [guests, setGuests] = useAtom(guestsAtom);

  const currentBooking = useMemo(
    () => bookings.find((booking) => booking.id === id),
    [bookings, id]
  );

  const { updateBooking } = useBooking();

  function registerValues() {
    if (!currentBooking) return;
    setCheckInDate(currentBooking.checkIn);
    setCheckOutDate(currentBooking.checkOut);
    setGuests(currentBooking.guests);
  }

  const totalDays = useMemo(() => {
    if (!checkInDate || !checkOutDate) return 1;
    return differenceInDays(checkOutDate, checkInDate);
  }, [checkInDate, checkOutDate]);

  const finalPrice = useMemo(() => {
    return calculateFinalPrice({
      price: currentBooking?.property?.price,
      extraPrice: currentBooking?.property?.extraGuestPrice,
      guests,
      totalDays,
    });
  }, [
    currentBooking?.property?.price,
    currentBooking?.property?.extraGuestPrice,
    guests,
    totalDays,
  ]);

  function handleUpdateBooking() {
    if (!currentBooking) return;
    updateBooking({
      booking: {
        ...currentBooking,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests,
        finalPrice,
      },
    });
  }

  return (
    <Dialog onOpenChange={registerValues}>
      <DialogTrigger asChild>
        <Button data-testid="update-button" variant="outline">
          Update
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit booking</DialogTitle>
          <DialogDescription>
            Make changes to your booking here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Chek-in Date
            </Label>
            <div className="sm:col-span-3">
              <DatePicker atom={checkInDateAtom} />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Chek-out Date
            </Label>
            <div className="sm:col-span-3">
              <DatePicker atom={checkOutDateAtom} />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Number of Guests
            </Label>
            <div className="sm:col-span-3">
              <Input
                type="number"
                testId="guests-input"
                id="guests"
                name="guests"
                value={guests}
                onChange={(e) => setGuests(parseInt(e.target.value))}
              />
            </div>
          </div>
        </div>
        <DialogFooter className="items-center">
          <strong>New Total: {formatCurrency(finalPrice)}</strong>
          <Button data-testid="save-changes" onClick={handleUpdateBooking}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateBookingDialog;
