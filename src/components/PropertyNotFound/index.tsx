import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

// Component to show when no property is found
const PropertyNotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Card className="mx-auto border rounded-lg mt-24 shadow-md w-full max-w-sm">
      <CardHeader className="space-y-2">
        <Button
          variant="ghost"
          className="p-0 mb-4 mr-auto"
          onClick={handleGoBack}
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </Button>
        <CardTitle className="text-2xl font-bold">Whoops!</CardTitle>
        <CardDescription className="text-xl">
          No property available 😕
        </CardDescription>
        <CardFooter>
          <Button
            variant="outline"
            onClick={handleGoBack}
            className="w-full mt-5"
          >
            Go Home
            <ArrowRightIcon className="ml-2" />
          </Button>
        </CardFooter>
      </CardHeader>
    </Card>
  );
};

export default PropertyNotFound;
