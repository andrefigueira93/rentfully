import { DatePicker } from "@/components/ui/date-picker";
import { checkOutFilterAtom } from "@/store/booking-filters-store";
import { endOfTomorrow } from "date-fns";
import { useAtom } from "jotai";
import ClearButton from "../ClearButton";
import FilterWrapper from "../FilterWrapper";

export default function CheckOutFilter() {
  const [value, setValue] = useAtom(checkOutFilterAtom);

  // When clearing the check-out
  // we need to respect the min of 1 day.
  // So we set the check-out to the end of tomorrow
  function handleClear() {
    setValue(endOfTomorrow());
  }

  return (
    <FilterWrapper label="Check-out date">
      <DatePicker atom={checkOutFilterAtom} minDate={endOfTomorrow()} />
      {value && <ClearButton onClick={handleClear} />}
    </FilterWrapper>
  );
}
