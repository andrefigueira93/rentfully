import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import AnimatedView from "@/components/ui/animated-view";
import { RocketIcon } from "@radix-ui/react-icons";
import React from "react";
import HeroBanner from "./components/HeroBanner";
import LovedByGuests from "./components/LovedByGuests";
import PopularLocations from "./components/PopularLocations";

const HomePage: React.FC = () => {
  return (
    <AnimatedView>
      <HeroBanner
        title="Book your stay with Rentfully!"
        subtitle="1,480,086 properties around the world are waiting for you!"
        image="https://assets-global.website-files.com/603dfae5ed7c980420ff37e4/65282ded6d6f4c5d21aed85f_shutterstock_425235997.jpg"
      />
      <PopularLocations />
      <LovedByGuests />
      <Alert className="mt-8 shadow-md">
        <RocketIcon className="h-4 w-4" />
        <AlertTitle>Heey! Stay tuned with us</AlertTitle>
        <AlertDescription>
          You can subscribe to our newsletter to get the latest news about
        </AlertDescription>
      </Alert>
    </AnimatedView>
  );
};

export default HomePage;
