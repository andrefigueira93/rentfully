import PropertyNotFound from "@/components/PropertyNotFound";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { filteredPropertiesAtom } from "@/store/booking-filters-store";
import { useAtomValue } from "jotai";
import { PropertyCard } from "../PropertyCard";

export default function PropertiesPanel() {
  const filteredProperties = useAtomValue(filteredPropertiesAtom);
  const { scrollPosition } = useScrollPosition();

  if (filteredProperties.length === 0) {
    return <PropertyNotFound />;
  }

  return (
    <div data-testid="properties-panel" className="flex flex-col space-y-8">
      {filteredProperties.map((property) => (
        <PropertyCard
          key={property?.id}
          property={property}
          // Passing the scroll position to the card
          // to prevent the image from loading
          // if the card is not in view.
          scrollPosition={scrollPosition}
        />
      ))}
    </div>
  );
}
