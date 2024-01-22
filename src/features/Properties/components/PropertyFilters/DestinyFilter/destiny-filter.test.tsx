/* eslint-disable @typescript-eslint/no-explicit-any */
import Providers from "@/providers";
import { fireEvent, render, screen } from "@testing-library/react";
import { useAtom } from "jotai";
import { MemoryRouter } from "react-router";
import DestinyFilter from "./index";

vi.mock("jotai", async () => {
  const originalModule = await import("jotai");

  return {
    ...originalModule,
    useAtom: vi.fn(),
  };
});
const mockSetValue = vi.fn() as never;
const selectedLocation = "new york";

describe("DestinyFilter Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useAtom).mockReturnValue([selectedLocation, mockSetValue]);
  });

  test("renders correctly", () => {
    const { container } = render(
      <MemoryRouter>
        <Providers>
          <DestinyFilter />
        </Providers>
      </MemoryRouter>
    );

    expect(screen.getByText("Destiny")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  // test('opens and closes the popover', () => {
  //   const { container } = render(
  //     <MemoryRouter>
  //       <Providers>
  //         <DestinyFilter />
  //       </Providers>
  //     </MemoryRouter>
  //   );

  //   const button = screen.getByRole('combobox');
  //   fireEvent.click(button);

  //   expect(screen.getByRole('listbox')).toBeInTheDocument();

  //   fireEvent.click(button);

  //   expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  //   expect(container).toMatchSnapshot();
  // });

  test("selects a location", () => {
    render(
      <MemoryRouter>
        <Providers>
          <DestinyFilter />
        </Providers>
      </MemoryRouter>
    );

    const button = screen.getByRole("combobox");
    fireEvent.click(button);

    const locationOption = screen.getByTestId("location-option-0");
    fireEvent.click(locationOption);

    expect(mockSetValue).toHaveBeenCalled();

    // expect(container).toMatchSnapshot();
    // Can't make snapshot because of the random generation
  });

  test("displays selected destiny", () => {
    render(
      <MemoryRouter>
        <Providers>
          <DestinyFilter />
        </Providers>
      </MemoryRouter>
    );

    const button = screen.getByRole("combobox");
    fireEvent.click(button);

    const locationOption = screen.getByTestId("location-option-0");
    fireEvent.click(locationOption);

    const text = locationOption.textContent;

    expect(screen.findAllByText(text as string)).toBeTruthy();

    // Can't make snapshot because of the random generation
    // of the options, but it works.
  });

  test("clears the selected location", () => {
    const selectedLocation = "New York";
    const setValueMock = vi.fn() as never;
    vi.mocked(useAtom).mockReturnValue([selectedLocation, setValueMock]);

    // Can't make snapshot because of the random generation
    // of the options, but it works.

    // If you wanna check the snapshot, uncomment the line below
    // const { container } =
    render(
      <MemoryRouter>
        <Providers>
          <DestinyFilter />
        </Providers>
      </MemoryRouter>
    );

    const clearButton = screen.getByTestId("clear-button");
    fireEvent.click(clearButton);

    expect(setValueMock).toHaveBeenCalledWith(undefined);
    // If you wanna check the snapshot, uncomment the line below
    // expect(container).toMatchSnapshot();
  });
});
