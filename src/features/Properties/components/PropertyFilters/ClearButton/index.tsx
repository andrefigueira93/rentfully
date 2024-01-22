import { Button, ButtonProps } from "@/components/ui/button";
import { Cross1Icon } from "@radix-ui/react-icons";
import React from "react";

const CloseButton: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <Button
      data-testid="clear-button"
      className="ml-1"
      variant="outline"
      {...rest}
    >
      <Cross1Icon />
      {children}
    </Button>
  );
};

export default CloseButton;
