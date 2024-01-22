import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { locationFilterAtom } from "@/store/booking-filters-store";
import { uniqueLocationsAtom } from "@/store/properties-store";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { useAtom, useAtomValue } from "jotai";
import React, { useMemo } from "react";
import ClearButton from "../ClearButton";
import FilterWrapper from "../FilterWrapper";

export default function DestinyFilter() {
  const locations = useAtomValue(uniqueLocationsAtom);
  const [value, setValue] = useAtom(locationFilterAtom);
  const [open, setOpen] = React.useState(false);
  const mapedLocations = useMemo(
    () =>
      locations.map((l) => ({
        label: l?.city ?? "",
        value: l?.city ?? "",
      })),
    [locations]
  );

  function handleClear() {
    setValue(undefined);
  }

  return (
    <FilterWrapper label="Destiny">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between w-full"
          >
            {value
              ? mapedLocations.find(
                  (framework) =>
                    framework.value?.toLowerCase() === value?.toLowerCase()
                )?.label
              : "Pick a location..."}
            <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] max-h-60 overflow-scroll p-0">
          <Command>
            <CommandInput placeholder="Pick a location..." />
            <CommandEmpty>Destiny not found.</CommandEmpty>
            <CommandGroup>
              {mapedLocations.map((framework, i) => (
                <CommandItem
                  data-testid={`location-option-${i}`}
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      {value && <ClearButton onClick={handleClear} />}
    </FilterWrapper>
  );
}
