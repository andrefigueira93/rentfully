import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { bookingFiltersAtom } from "@/store/booking-filters-store";
import { useSetAtom } from "jotai";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";

// Card of a single popular location
const PopularLocationCard: React.FC<{
  city?: string;
  image?: string;
}> = ({ city, image }) => {
  const navigate = useNavigate();
  const setFilter = useSetAtom(bookingFiltersAtom);

  const handleClick = () => {
    setFilter({
      location: city?.toLowerCase(),
      numberOfGuests: 1,
      checkIn: undefined,
      checkOut: undefined,
    });
    navigate(`/properties`);
  };
  return (
    <Card className="relative group flex flex-col bg-cover h-52 bg-center bg-no-repeat bg-gray-100 rounded-lg shadow-md">
      <LazyLoadImage
        alt={city}
        className="w-full absolute h-52 object-cover rounded-lg"
        effect="blur"
        src={image}
      />
      <div className="bg-black transition group-hover:bg-opacity-10 absolute z-0 bg-opacity-30 h-full w-full rounded-md" />
      <CardHeader>
        <CardTitle className="text-2xl drop-shadow text-white">
          {city}
        </CardTitle>
      </CardHeader>
      <CardFooter className="mt-auto">
        <Button
          variant="outline"
          className="ml-auto bottom-0 z-10"
          onClick={handleClick}
        >
          See properties
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PopularLocationCard;
