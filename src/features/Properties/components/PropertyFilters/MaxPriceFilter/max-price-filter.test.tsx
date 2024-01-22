/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen } from "@testing-library/react";
import { useAtom, useAtomValue } from "jotai";
import MaxPriceFilter from "./index";

const mockSetMaxPrice = vi.fn() as never;

vi.mock("jotai", async () => {
  const originalModule = await vi.importActual("jotai");

  return {
    ...(originalModule as any),
    useAtom: vi.fn(),
    useAtomValue: vi.fn(),
  };
});

vi.mock("@/store/properties-store", () => ({
  minMaxPriceAtom: vi.fn(),
}));

vi.mock("@/store/booking-filters-store", () => ({
  maxPriceFilterAtom: vi.fn(),
}));

describe("MaxPriceFilter Component", () => {
  beforeEach(() => {
    vi.mocked(useAtom).mockReturnValue([null, mockSetMaxPrice]);
    vi.mocked(useAtomValue).mockReturnValueOnce({ min: 0, max: 100 });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("renders correctly", () => {
    render(<MaxPriceFilter />);

    expect(screen.getByText("Max price")).toBeInTheDocument();
    expect(screen.getByRole("slider")).toBeInTheDocument();
  });

  test("updates max price on change", () => {
    render(<MaxPriceFilter />);

    const slider = screen.getByRole("slider");
    fireEvent.change(slider, { target: { value: "50" } });

    expect(mockSetMaxPrice).toHaveBeenCalledWith(50);
  });
});
