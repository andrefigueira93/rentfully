import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useBooking } from "@/hooks/useBooking";
import { formatCurrency } from "@/lib/utils";
import { ListPropertyProps } from "@/schemas/property";
import { numberOfGuestsFilterAtom } from "@/store/booking-filters-store";
import { PlusIcon } from "@radix-ui/react-icons";
import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { LazyLoadImage, ScrollPosition } from "react-lazy-load-image-component";

export type PropertyCardProps = {
  property: ListPropertyProps[number];
  scrollPosition: ScrollPosition;
};

function TimesRentedBadge({ timesRented }: { timesRented: number }) {
  return (
    <Badge
      variant="secondary"
      className="justify-center self-end dark:text-white font-semibold text-lg items-center mb-4 md:mb-0"
    >
      <PlusIcon className="mr-1" /> {timesRented} rents
    </Badge>
  );
}

export function PropertyCard({ property, scrollPosition }: PropertyCardProps) {
  const numberOfGuests = useAtomValue(numberOfGuestsFilterAtom);

  const { newBooking } = useBooking();

  const finalPrice = useMemo(() => {
    if (numberOfGuests > 1) {
      return property?.price + (property?.extraGuestPrice * numberOfGuests - 1);
    }
    return property?.price;
  }, [numberOfGuests, property]);

  const handleNewBooking = () => {
    newBooking(property.id);
  };

  return (
    <Card
      key={property?.id}
      data-testid="property-card"
      className="border rounded-lg bg-white dark:bg-slate-900"
    >
      <CardHeader className="flex md:flex-row space-x-6">
        <LazyLoadImage
          src={property?.image}
          alt={property?.name}
          scrollPosition={scrollPosition}
          effect="blur"
          width="100%"
          className="h-56 md:h-48 w-full rounded-md shadow"
        />
        <div className="flex flex-col w-full">
          <CardTitle className="text-3xl">{property?.name}</CardTitle>
          <p>
            {property?.address}, {property?.city}, {property?.country}
          </p>
          <CardDescription className="text-lg mt-4">
            {property?.description}
          </CardDescription>
        </div>
        <div className="flex flex-col shrink-0">
          <TimesRentedBadge timesRented={property?.timesRented} />
          <div className="flex flex-col mt-auto justify-end">
            <strong className="font-black text-xl mb-2">
              {formatCurrency(finalPrice)}/night
            </strong>
            <Button
              onClick={handleNewBooking}
              className="font-bold dark:text-white"
            >
              Book now
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
