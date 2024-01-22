import PropertyNotFound from "@/components/PropertyNotFound";
import AnimatedView from "@/components/ui/animated-view";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import GridPanel from "@/components/ui/grid-panel";
import PageTitle from "@/components/ui/page-title";
import { useAuth } from "@/hooks/useAuth";
import { newBookingAtom } from "@/store/bookings-store";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { useAtomValue } from "jotai";
import React, { useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import ConfirmBookingCard from "../components/ConfirmBookingCard";

const NewBookingScreen: React.FC = () => {
  const newBooking = useAtomValue(newBookingAtom);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/sign-in");
    }
  }, [isAuthenticated]);

  if (!newBooking?.property?.name) {
    return <PropertyNotFound />;
  }

  return (
    <AnimatedView>
      <PageTitle title={newBooking?.property?.name} />
      <GridPanel>
        <Card className="sm:col-span-2">
          <CardHeader>
            <LazyLoadImage
              src={newBooking?.property?.image}
              className="h-96 rounded-lg shadow-md"
            />
            <CardTitle className="text-3xl pt-5">
              {newBooking?.property?.name}
            </CardTitle>
            <p className="flex items-center">
              <MapPinIcon className="h-6 w-6 mr-2" />
              {newBooking?.property?.address}, {newBooking?.property?.city},{" "}
              {newBooking?.property?.state}, {newBooking?.property?.country}
            </p>
            <CardDescription className="text-xl">
              {newBooking?.property?.description}
            </CardDescription>
          </CardHeader>
        </Card>
        <ConfirmBookingCard />
      </GridPanel>
    </AnimatedView>
  );
};

export default NewBookingScreen;
