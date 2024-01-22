import { Label } from "@/components/ui/label";
import { PropsWithChildren } from "react";

function Wrapper({ children }: PropsWithChildren) {
  return (
    <div className="w-full flex items-center justify-evenly">{children}</div>
  );
}

// Default component to wrap filters
export default function FilterWrapper({
  label,
  addOn,
  htmlFor,
  children,
}: PropsWithChildren<{
  label: string;
  addOn?: React.ReactNode;
  htmlFor?: string;
}>) {
  return (
    <div className="flex flex-col space-y-2">
      <Wrapper>
        <Label htmlFor={htmlFor} className="w-full">
          {label}
        </Label>
        {addOn}
      </Wrapper>
      <Wrapper>{children}</Wrapper>
    </div>
  );
}
