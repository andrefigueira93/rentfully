import { popularPropertiesAtom } from "@/store/properties-store";
import { useAtomValue } from "jotai";
import React from "react";
import SectionWrapper from "@/components/SectionWrapper";
import LovedByGuestsCard from "./LovedByGuestsCard";

// Section called LovedByGuests should display
// the properties that have been rented a lot.
// The component should be a section with a title
// and a grid panel with the properties.
const LovedByGuests: React.FC = () => {
  // Since we are using the popularPropertiesAtom with the computed data,
  // we can simple use the useAtomValue hook
  const lovedProperties = useAtomValue(popularPropertiesAtom);
  return (
    <SectionWrapper
      title="Loved by guests"
      action={{
        text: "See more properties",
        link: "/properties",
      }}
    >
      {lovedProperties.map((lovedProperty) => (
        <LovedByGuestsCard key={lovedProperty?.id} {...lovedProperty} />
      ))}
    </SectionWrapper>
  );
};

export default LovedByGuests;
