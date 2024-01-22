import { Button } from "@/components/ui/button";
import GridPanel, { GridPanelProps } from "@/components/ui/grid-panel";
import SectionTitle, { SectionTitleProps } from "@/components/ui/section-title";
import React, { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

interface SectionWrapperProps extends PropsWithChildren {
  title: string;
  action?: {
    text: string;
    link: string;
  };
  sectionProps?: React.HTMLAttributes<HTMLElement>;
  titleProps?: SectionTitleProps;
  gridPanelProps?: GridPanelProps;
}

// Default component to wrap sections
const SectionWrapper: React.FC<SectionWrapperProps> = ({
  title,
  action,
  sectionProps,
  gridPanelProps,
  titleProps,
  children,
}) => {
  return (
    <section
      id={`${title} section`}
      className="flex flex-col"
      {...sectionProps}
    >
      <div className="mt-16 mb-2 flex w-full justify-between items-center">
        <SectionTitle {...titleProps}>{title}</SectionTitle>
        {action?.link && (
          <Link to={action?.link}>
            <Button variant="outline">{action?.text}</Button>
          </Link>
        )}
      </div>
      <GridPanel {...gridPanelProps}>{children}</GridPanel>
    </section>
  );
};

export default SectionWrapper;
