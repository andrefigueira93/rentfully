import { DatePicker } from "@/components/ui/date-picker";
import { checkInFilterAtom } from "@/store/booking-filters-store";
import { startOfToday } from "date-fns";
import { useAtom } from "jotai";
import ClearButton from "../ClearButton";
import FilterWrapper from "../FilterWrapper";

export default function CheckInFilter() {
  const [value, setValue] = useAtom(checkInFilterAtom);

  function handleClear() {
    setValue(startOfToday());
  }

  return (
    <FilterWrapper label="Check-in date">
      <DatePicker id="check-in" atom={checkInFilterAtom} />
      {value && <ClearButton onClick={handleClear} />}
    </FilterWrapper>
  );
}
