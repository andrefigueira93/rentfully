import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const ContainerVariants = cva("flex flex-col min-h-full w-full", {
  variants: {
    padded: {
      true: "p-4 md:p-8 mx-auto max-w-7xl",
      false: "p-0",
    },
  },
  defaultVariants: {
    padded: false,
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof ContainerVariants> {}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, children, padded, ...props }, ref) => {
    return (
      <div
        className={cn(ContainerVariants({ className, padded }))}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Container.displayName = "Container";

export { Container, ContainerVariants };
