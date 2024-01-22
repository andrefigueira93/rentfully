import { Button } from "@/components/ui/button";
import { numberOfGuestsFilterAtom } from "@/store/booking-filters-store";
import { maxGuestsAtom } from "@/store/properties-store";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { useAtom, useAtomValue } from "jotai";
import { toast } from "sonner";
import FilterWrapper from "../FilterWrapper";

export default function NumberOfGuestsFilter() {
  const [numberOfGuests, setNumberOfGuests] = useAtom(numberOfGuestsFilterAtom);
  const maxGuests = useAtomValue(maxGuestsAtom);

  function SubGuest() {
    setNumberOfGuests((prev) => {
      if (prev > 1) {
        return prev - 1;
      }

      toast("Minimium of one guest", {
        cancel: {
          label: "Ok",
        },
      });

      return prev;
    });
  }

  function AddGuest() {
    setNumberOfGuests((prev) => {
      if (prev < maxGuests) {
        return prev + 1;
      }
      toast("We do not have enough rooms for this number of guests", {
        cancel: {
          label: "Ok",
        },
      });
      return prev;
    });
  }

  return (
    <FilterWrapper label="Number of guests">
      <Button
        aria-labelledby="Subtract guest"
        data-testid="subtract-guest"
        onClick={SubGuest}
        variant="outline"
      >
        <MinusIcon />
      </Button>
      <span className="mx-2">{numberOfGuests}</span>
      <Button data-testid="add-guest" onClick={AddGuest} variant="outline">
        <PlusIcon />
      </Button>
    </FilterWrapper>
  );
}
