import AnimatedView from "@/components/ui/animated-view";
import GridPanel from "@/components/ui/grid-panel";
import PageTitle from "@/components/ui/page-title";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { uniqueLocationsAtom } from "@/store/properties-store";
import { useAtomValue } from "jotai";
import React from "react";
import LocationCard from "./components/LocationCard";

const LocationsPage: React.FC = () => {
  const locations = useAtomValue(uniqueLocationsAtom);

  const { scrollPosition } = useScrollPosition();

  return (
    <AnimatedView>
      <PageTitle title="Locations" />
      <GridPanel className="sm:grid-cols-2">
        {locations.map((location) => (
          <LocationCard
            key={location?.id}
            location={location}
            // Passing the scroll position to the card
            // to prevent the image from loading
            // if the card is not in view.
            scrollPosition={scrollPosition}
          />
        ))}
      </GridPanel>
    </AnimatedView>
  );
};

export default LocationsPage;
