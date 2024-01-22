import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { endOfDay, format, startOfToday } from "date-fns";
import { atom, useAtom } from "jotai";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

const dateAtom = atom<Date | undefined>(new Date());

export function DatePicker({
  atom = dateAtom,
  id = "date-picker",
  minDate = startOfToday(),
}: {
  id?: string;
  atom?: typeof dateAtom;
  currentDate?: Date;
  minDate?: Date;
}) {
  const [date, setDate] = useAtom(atom);

  const handleSetDate = (date: Date | undefined) => {
    if (!date) return;
    setDate(endOfDay(date));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal w-full",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          id={id}
          selected={date}
          onSelect={handleSetDate}
          initialFocus
          fromDate={minDate}
          ISOWeek={true}
          className="w-full"
        />
      </PopoverContent>
    </Popover>
  );
}
