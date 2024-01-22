/* eslint-disable @typescript-eslint/no-explicit-any */
import Providers from "@/providers";
import { fireEvent, render, screen } from "@testing-library/react";
import { useAtom } from "jotai";
import { MemoryRouter } from "react-router";
import NumberOfGuestsFilter from "./index";

vi.mock("jotai", async () => {
  const originalModule = await import("jotai");

  return {
    ...originalModule,
    useAtom: vi.fn(),
  };
});

const mockSetValue = vi.fn() as never;
const selectedGuests = 5;

const mockSetNumberOfGuests = vi.fn() as never;

describe("NumberOfGuestsFilter Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAtom).mockReturnValue([selectedGuests, mockSetValue]);
  });

  test("renders correctly", () => {
    const { container } = render(
      <MemoryRouter>
        <Providers>
          <NumberOfGuestsFilter />
        </Providers>
      </MemoryRouter>
    );

    expect(screen.getByText("Number of guests")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test("subtracts a guest", () => {
    vi.mocked(useAtom).mockReturnValue([5, mockSetNumberOfGuests]);

    const { container } = render(
      <MemoryRouter>
        <Providers>
          <NumberOfGuestsFilter />
        </Providers>
      </MemoryRouter>
    );

    const subtractButton = screen.getByTestId("subtract-guest");
    fireEvent.click(subtractButton);

    expect(mockSetNumberOfGuests).toHaveBeenCalled();
    expect(container).toMatchSnapshot();
  });

  test("adds a guest", () => {
    vi.mocked(useAtom).mockReturnValue([10, mockSetNumberOfGuests]);

    const { container } = render(
      <MemoryRouter>
        <Providers>
          <NumberOfGuestsFilter />
        </Providers>
      </MemoryRouter>
    );

    const addButton = screen.getByTestId("add-guest");
    fireEvent.click(addButton);

    expect(mockSetNumberOfGuests).toHaveBeenCalled();
    expect(container).toMatchSnapshot();
  });
});
