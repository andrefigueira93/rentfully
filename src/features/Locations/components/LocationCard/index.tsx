import { Button } from "@/components/ui/button";
import { bookingFiltersAtom } from "@/store/booking-filters-store";
import { UniqueLocationsAtomType } from "@/store/properties-store";
import { motion } from "framer-motion";
import { useSetAtom } from "jotai";
import React, { useEffect, useMemo, useRef } from "react";
import { LazyLoadImage, ScrollPosition } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";

const LocationCard: React.FC<{
  location: UniqueLocationsAtomType[number];
  scrollPosition: ScrollPosition;
}> = ({ location, scrollPosition }) => {
  // State to check if the card is in view
  const [inView, setInView] = React.useState(false);
  const navigate = useNavigate();
  const setFilter = useSetAtom(bookingFiltersAtom);

  const handleClick = () => {
    setFilter({
      location: location?.city?.toLowerCase(),
      numberOfGuests: 1,
      checkIn: undefined,
      checkOut: undefined,
    });
    navigate(`/properties`);
  };
  // Ref to the card element
  const card = useRef(null);

  // Animation variants
  const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  // Animation transition
  const transition = {
    duration: 0.5,
    ease: "easeInOut",
  };

  // Animation state
  const animate = useMemo(() => (inView ? "visible" : "hidden"), [inView]);

  // Intersection observer to check if the card is in view
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      setInView(entry.isIntersecting);
    });

    // Get the card element
    const cardRef = card?.current;

    if (cardRef) {
      // If the card element exists, observe it
      observer.observe(cardRef);
    }

    return () => {
      // When the component unmounts, unobserve the card element
      if (cardRef) {
        observer.unobserve(cardRef);
      }
    };
  }, []);

  return (
    <motion.section
      ref={card}
      animate={animate}
      variants={variants}
      transition={transition}
      aria-labelledby="location-card"
      className="first-of-type:col-span-2 relative overflow-hidden rounded-lg lg:h-96"
    >
      <div className="absolute inset-0">
        <LazyLoadImage
          src={location?.image}
          alt={location?.name}
          scrollPosition={scrollPosition}
          width={"100%"}
          effect="blur"
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div aria-hidden="true" className="relative h-96 w-full lg:hidden" />
      <div className="absolute inset-x-0 bottom-0 rounded-bl-lg rounded-br-lg bg-black bg-opacity-50 p-6 backdrop-blur backdrop-filter sm:flex sm:items-center sm:justify-between lg:inset-x-auto lg:inset-y-0 lg:w-96 lg:flex-col lg:items-start lg:rounded-br-none lg:rounded-tl-lg space-y-4">
        <div>
          <h2 id="location-heading" className="text-xl font-bold text-white">
            {location?.city} - {location?.country}
          </h2>
          <p className="mt-1 text-sm text-gray-300">
            {location?.description} properties
          </p>
        </div>
        <Button variant="outline" className="w-full" onClick={handleClick}>
          See properties
        </Button>
      </div>
    </motion.section>
  );
};

export default LocationCard;
