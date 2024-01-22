/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen } from "@testing-library/react";
import { useSetAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { describe, expect, test, vi } from "vitest";
import PopularLocationCard from "./index";

vi.mock("jotai", async () => {
  const actualModule = await vi.importActual("jotai");
  return {
    ...(actualModule as any),
    useSetAtom: vi.fn(),
  };
});

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

describe("PopularLocationCard Component", () => {
  const mockSetFilter = vi.fn();
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.mocked(useSetAtom).mockReturnValue(mockSetFilter);
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  const mockCity = "Test City";
  const mockImage = "test-image.jpg";

  test("renders correctly with city and image", () => {
    render(<PopularLocationCard city={mockCity} image={mockImage} />);

    expect(screen.getByAltText(mockCity)).toBeInTheDocument();
    expect(screen.getByText(mockCity)).toBeInTheDocument();
    expect(screen.getByText("See properties")).toBeInTheDocument();
  });

  test("navigates and sets filter on button click", () => {
    render(<PopularLocationCard city={mockCity} image={mockImage} />);

    const button = screen.getByText("See properties");
    fireEvent.click(button);

    expect(mockSetFilter).toHaveBeenCalledWith({
      location: mockCity.toLowerCase(),
      numberOfGuests: 1,
      checkIn: undefined,
      checkOut: undefined,
    });
    expect(mockNavigate).toHaveBeenCalledWith("/properties");
  });
});
