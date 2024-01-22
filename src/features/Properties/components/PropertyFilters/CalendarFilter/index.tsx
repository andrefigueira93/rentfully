import { Calendar } from "@/components/ui/calendar";
import {
  checkInFilterAtom,
  checkOutFilterAtom,
} from "@/store/booking-filters-store";
import { addDays } from "date-fns";
import { useAtom } from "jotai";
import React, { useMemo } from "react";

const CalendarSelect: React.FC = () => {
  const [fromDate, setFromDate] = useAtom(checkInFilterAtom);
  const [toDate, setToDate] = useAtom(checkOutFilterAtom);

  function onDayClick(day: Date) {
    if (!fromDate) {
      setFromDate(day);
      return;
    }

    if (fromDate && !toDate) {
      if (day.getTime() < fromDate.getTime()) {
        setFromDate(day);
        return;
      }

      setToDate(day);
      return;
    }

    if (fromDate && toDate) {
      setFromDate(day);
      setToDate(undefined);
      return;
    }
  }

  const selected = useMemo(() => {
    if (!fromDate || !toDate) {
      return [];
    }

    const selectedDays = [];

    let currentDate = fromDate;

    while (currentDate <= toDate) {
      selectedDays.push(currentDate);
      currentDate = addDays(currentDate, 1);
    }

    return selectedDays;
  }, [fromDate, toDate]);
  return (
    <Calendar
      fromDate={new Date()}
      onDayClick={onDayClick}
      selected={selected}
    />
  );
};

export default CalendarSelect;
