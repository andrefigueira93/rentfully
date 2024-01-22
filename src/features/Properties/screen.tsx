import AnimatedView from "@/components/ui/animated-view";
import PageTitle from "@/components/ui/page-title";
import React from "react";
import MobileFilters from "./components/MobileFilters";
import PropertiesPanel from "./components/PropertiesPanel";
import PropertyFilters from "./components/PropertyFilters";

const PropertiesPage: React.FC = () => {
  return (
    <AnimatedView>
      <PageTitle title="Properties" />
      <div className="grid grid-cols-1 md:grid-cols-8 gap-4">
        <div className="hidden md:block md:col-span-2">
          <PropertyFilters />
        </div>
        <MobileFilters />
        <div className="md:col-span-6">
          <PropertiesPanel />
        </div>
      </div>
    </AnimatedView>
  );
};

export default PropertiesPage;
