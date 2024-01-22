/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatCurrency } from "@/lib/utils";
import { ListPropertyProps } from "@/schemas/property";
import { fireEvent, render, screen } from "@testing-library/react";
import { PropertyCard } from "./index";

const mockNewBooking = vi.fn();

vi.mock("@/hooks/useBooking", async () => {
  const actualModule = await vi.importActual("@/hooks/useBooking");
  return {
    ...(actualModule as any),
    useBooking: () => ({
      newBooking: mockNewBooking,
    }),
  };
});

describe("PropertyCard Component", () => {
  const mockProperty = {
    id: 1,
    name: "Test Property",
    address: "Test Address",
    city: "Test City",
    state: "Test State",
    country: "Test Country",
    image: "test-image.jpg",
    description: "Test Description",
    price: 100,
    visible: true,
    maxGuests: 5,
    extraGuestPrice: 50,
    timesRented: 5,
    createdAt: new Date(),
  } as ListPropertyProps[number];

  const mockScrollPosition = {
    x: 0,
    y: 0,
  };

  test("renders correctly with property data", () => {
    const { container } = render(
      <PropertyCard
        property={mockProperty}
        scrollPosition={mockScrollPosition}
      />
    );

    expect(screen.getByTestId("property-card")).toBeInTheDocument();
    expect(screen.getByText(mockProperty.name)).toBeInTheDocument();
    expect(screen.getByText(mockProperty.description)).toBeInTheDocument();
    expect(
      screen.getByText(`${mockProperty.timesRented} rents`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${formatCurrency(mockProperty.price)}/night`)
    ).toBeInTheDocument();
    expect(screen.getByText("Book now")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test("calls newBooking function on button click", () => {
    vi.mock("@/hooks/useBooking", () => ({
      useBooking: () => ({
        newBooking: mockNewBooking,
      }),
    }));

    const { container } = render(
      <PropertyCard
        property={mockProperty}
        scrollPosition={mockScrollPosition}
      />
    );

    const button = screen.getByText("Book now");
    fireEvent.click(button);

    expect(mockNewBooking).toHaveBeenCalledWith(mockProperty.id);
    expect(container).toMatchSnapshot();
  });
});
