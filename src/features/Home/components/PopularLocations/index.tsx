import SectionWrapper from "@/components/SectionWrapper";
import { topLocationsAtom } from "@/store/properties-store";
import { useAtomValue } from "jotai";
import React from "react";
import PopularLocationCard from "./PopularLocationCard";

// This section should display the most popular locations
const PopularLocations: React.FC = () => {
  // Since we are using the topLocationsAtom with the computed data,
  // we can simple use the useAtomValue hook
  const popularLocations = useAtomValue(topLocationsAtom);

  return (
    <SectionWrapper
      title="Popular locations"
      action={{
        text: "See locations",
        link: "/locations",
      }}
    >
      {popularLocations.map((location) => (
        <PopularLocationCard
          key={location?.city}
          city={location?.city}
          image={location?.image}
        />
      ))}
    </SectionWrapper>
  );
};

export default PopularLocations;
