import { Card, CardContent, CardHeader } from "@/components/ui/card";
import SectionTitle from "@/components/ui/section-title";
import React from "react";
import CalendarFilter from "./CalendarFilter";
import CheckInFilter from "./CheckInFilter";
import CheckOutFilter from "./CheckOutFilter";
import DestinyFilter from "./DestinyFilter";
import MaxPriceFilter from "./MaxPriceFilter";
import NumberOfGuestsFilter from "./NumberOfGuestsFilter";

const PropertyFilters: React.FC = () => {
  return (
    <Card className="sticky top-5">
      <CardHeader>
        <SectionTitle>Your search</SectionTitle>
      </CardHeader>
      <CardContent className="space-y-2 md:space-y-6">
        <DestinyFilter />
        <CheckInFilter />
        <CheckOutFilter />
        <CalendarFilter />
        <MaxPriceFilter />
        <NumberOfGuestsFilter />
      </CardContent>
    </Card>
  );
};

export default PropertyFilters;
