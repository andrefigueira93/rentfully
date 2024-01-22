/* eslint-disable @typescript-eslint/no-explicit-any */
import TestWrapper from "@/__tests__/wrapper";
import * as BookingHook from "@/hooks/useBooking";
import { formatCurrency } from "@/lib/utils";
import { fireEvent, render, screen } from "@testing-library/react";
import * as Jotai from "jotai";
import * as ReactRouterDom from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import ConfirmBookingCard from "./index";

vi.mock("../hooks/useBooking");
vi.mock("jotai", async () => {
  const actualModule = await vi.importActual("jotai");
  return {
    ...(actualModule as any),
    useAtomValue: vi.fn(),
  };
});
vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

const mockNewBooking = {
  id: 1,
  property: {
    extraGuestPrice: 20,
  },
  totalDays: 3,
  finalPrice: 100,
};

describe("ConfirmBookingCard", () => {
  it("renders correctly with new booking details", () => {
    vi.spyOn(Jotai, "useAtomValue").mockReturnValue(mockNewBooking);
    render(<ConfirmBookingCard />, { wrapper: TestWrapper });
    expect(
      screen.getByText(`Total for ${mockNewBooking.totalDays} nights:`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(formatCurrency(mockNewBooking.finalPrice))
    ).toBeInTheDocument();
  });

  it("calls updateBooking and navigates on confirm button click", () => {
    const mockUpdateBooking = vi.fn();
    const mockNavigate = vi.fn();
    vi.spyOn(BookingHook, "useBooking").mockReturnValue({
      bookings: [],
      myBookings: [],
      deleteBooking: vi.fn(),
      updateBooking: mockUpdateBooking,
      newBooking: vi.fn(),
    });
    vi.spyOn(Jotai, "useAtomValue").mockReturnValue(mockNewBooking);
    vi.spyOn(ReactRouterDom, "useNavigate").mockReturnValue(mockNavigate);

    render(<ConfirmBookingCard />);
    fireEvent.click(screen.getByText("Confirm booking"));
    expect(mockUpdateBooking).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/my-bookings");
  });

  // Additional tests as needed
});
