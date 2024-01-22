/* eslint-disable @typescript-eslint/no-explicit-any */
import TestWrapper from "@/__tests__/wrapper";
import { UniqueLocationsAtomType } from "@/store/properties-store";
import { fireEvent, render, screen } from "@testing-library/react";
import { useSetAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";
import LocationCard from "./index";

// Mock the useSetAtom and useNavigate hooks
vi.mock("jotai", async () => {
  const actual = await vi.importActual("jotai");
  return {
    ...(actual as any),
    useSetAtom: vi.fn(),
  };
});

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

// Mock the IntersectionObserver
// TODO: FIND A BETTER WAY TO MOCK THIS
(global as any).IntersectionObserver = class IntersectionObserver {
  constructor(callback: any) {
    (this as any).callback = callback;
  }
  observe() {
    // Call the passed callback with a mocked entry
    (this as any).callback([{ isIntersecting: true }]);
  }
  unobserve() {}
};

describe("LocationCard Component", () => {
  const mockSetFilter = vi.fn();
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.mocked(useSetAtom).mockReturnValue(mockSetFilter);
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  const mockLocation = {
    city: "Test City",
    country: "Test Country",
    image: "test-image.jpg",
    description: "Test Description",
  } as UniqueLocationsAtomType[number];

  test("renders correctly with location data", () => {
    render(
      <LocationCard
        location={mockLocation}
        scrollPosition={{
          x: 0,
          y: 0,
        }}
      />,
      {
        wrapper: TestWrapper,
      }
    );

    expect(
      screen.getByText(`${mockLocation?.city} - ${mockLocation?.country}`)
    ).toBeInTheDocument();
    expect(screen.getByText("See properties")).toBeInTheDocument();
  });

  test("sets filter on button click", () => {
    render(
      <LocationCard
        location={mockLocation}
        scrollPosition={{
          x: 0,
          y: 0,
        }}
      />,
      {
        wrapper: TestWrapper,
      }
    );

    const button = screen.getByText("See properties");
    fireEvent.click(button);

    expect(mockSetFilter).toHaveBeenCalledWith({
      location: mockLocation?.city.toLowerCase(),
      numberOfGuests: 1,
      checkIn: undefined,
      checkOut: undefined,
    });
  });

  test("navigates to properties page on button click", () => {
    render(
      <LocationCard
        location={mockLocation}
        scrollPosition={{
          x: 0,
          y: 0,
        }}
      />,
      {
        wrapper: TestWrapper,
      }
    );

    const button = screen.getByText("See properties");
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith("/properties");
  });
});
