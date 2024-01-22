import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import { minMaxPriceAtom } from "@/store/properties-store";
import { maxPriceFilterAtom } from "@/store/booking-filters-store";
import { useAtom, useAtomValue } from "jotai";
import { useMemo } from "react";
import FilterWrapper from "../FilterWrapper";

export default function MaxPriceFilter() {
  const minMaxPrice = useAtomValue(minMaxPriceAtom);
  const [maxPrice, setMaxPrice] = useAtom(maxPriceFilterAtom);

  const priceAddOn = useMemo(() => {
    return (
      <strong>
        {formatCurrency(Number(maxPrice ?? minMaxPrice?.max))}/day
      </strong>
    );
  }, [maxPrice, minMaxPrice?.max]);

  return (
    <FilterWrapper label="Max price" addOn={priceAddOn}>
      <Input
        type="range"
        min={minMaxPrice?.min}
        max={minMaxPrice?.max}
        defaultValue={minMaxPrice?.max}
        value={maxPrice}
        onChange={(e) => setMaxPrice(Number(e.target.value))}
      />
    </FilterWrapper>
  );
}
