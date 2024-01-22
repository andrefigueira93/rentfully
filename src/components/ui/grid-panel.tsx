import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";

export interface GridPanelProps
  extends PropsWithChildren,
    React.HTMLAttributes<HTMLDivElement> {}

const GridPanel: React.FC<GridPanelProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <div
      className={cn("py-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-8", className)}
      {...rest}
    >
      {children}
    </div>
  );
};

export default GridPanel;
