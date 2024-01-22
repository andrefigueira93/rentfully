/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen } from "@testing-library/react";
import { endOfTomorrow } from "date-fns";
import { useAtom } from "jotai";
import CheckOutFilter from "./index";

vi.mock("jotai", async () => {
  const actual = await vi.importActual("jotai");
  return {
    ...(actual as any),
    useAtom: vi.fn(),
  };
});

describe("CheckInFilter Component", () => {
  const mockSetValue = vi.fn() as never;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAtom).mockReturnValue([endOfTomorrow(), mockSetValue]);
  });

  test("renders the CheckInFilter component correctly", () => {
    const { container } = render(<CheckOutFilter />);
    const clearButton = screen.getByTestId("clear-button");

    expect(screen.getByText("Check-out date")).toBeInTheDocument();
    expect(clearButton).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test("calls setValue with endOfTomorrow when clear button is clicked", () => {
    const { container } = render(<CheckOutFilter />);

    const clearButton = screen.getByTestId("clear-button");
    fireEvent.click(clearButton);

    expect(mockSetValue).toHaveBeenCalledWith(endOfTomorrow());
    expect(container).toMatchSnapshot();
  });
});
