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
import { formatCurrency } from "@/lib/utils";
import { PopularPropertiesAtomType } from "@/store/properties-store";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

// Card of a single popular location
const LovedByGuestsCard: React.FC<PopularPropertiesAtomType[number]> = ({
  id,
  address,
  city,
  country,
  description,
  image,
  name,
  price,
}) => {
  const { newBooking } = useBooking();

  const handleNewBooking = () => {
    newBooking(id);
  };

  return (
    <Card className="rounded-md shadow-lg dark:shadow-slate-700 flex flex-col">
      <LazyLoadImage
        alt={name}
        className="w-full h-52 object-cover rounded-lg"
        effect="blur"
        src={image}
      />
      <CardHeader>
        <CardTitle className="flex items-center">
          {name}
          <Badge className="ml-auto">hot 🔥</Badge>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
        <p>
          {address}, {city} - {country}
        </p>
      </CardHeader>
      <CardFooter className="flex flex-row items-center justify-between">
        <b className="flex items-center">from {formatCurrency(price)} / day</b>
        <Button
          onClick={handleNewBooking}
          className="font-bold dark:text-white"
        >
          Book now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LovedByGuestsCard;
