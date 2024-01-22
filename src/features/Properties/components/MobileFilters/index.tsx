import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { FunnelIcon } from "@heroicons/react/24/outline";
import React from "react";
import PropertyFilters from "../PropertyFilters";

const MobileFilters: React.FC = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="sticky z-20 top-2 items-center md:hidden shadow-md "
        >
          <FunnelIcon className="w-6 h-6 mr-2" />
          Filters
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <PropertyFilters />
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileFilters;
