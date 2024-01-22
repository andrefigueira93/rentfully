/* eslint-disable @typescript-eslint/no-explicit-any */
import TestWrapper from "@/__tests__/wrapper";
import * as BookingHook from "@/hooks/useBooking";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { addDays, endOfDay, startOfToday } from "date-fns";
import * as Jotai from "jotai";
import { describe, expect, test, vi } from "vitest";
import UpdateBookingDialog from "./index";

vi.mock("jotai", async () => {
  const actualModule = await vi.importActual("jotai");
  return {
    ...(actualModule as any),
    useAtom: vi.fn(),
  };
});

describe("UpdateBookingDialog", () => {
  const today = startOfToday();
  const mockBooking = {
    id: 1,
    propertyId: 1,
    checkIn: today,
    checkOut: endOfDay(addDays(today, 3)),
    guests: 2,
    property: {
      price: 100,
      extraGuestPrice: 20,
    },
  };

  beforeEach(() => {
    vi.spyOn(Jotai, "useAtomValue").mockReturnValue([mockBooking]);
    vi.spyOn(Jotai, "useAtom").mockReturnValue([new Date(), vi.fn() as never]);
  });

  test("renders correctly", () => {
    const { container } = render(<UpdateBookingDialog id={1} />, {
      wrapper: TestWrapper,
    });

    expect(screen.getByTestId("update-button")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test("populates initial values when dialog is opened", async () => {
    const { container } = render(<UpdateBookingDialog id={1} />, {
      wrapper: TestWrapper,
    });

    fireEvent.click(screen.getByTestId("update-button"));

    const guestsInput = screen.getByTestId("guests-input");
    expect(guestsInput).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test("calls updateBooking on save changes", async () => {
    const mockUpdateBooking = vi.fn();
    vi.spyOn(BookingHook, "useBooking").mockReturnValue({
      bookings: [],
      myBookings: [],
      deleteBooking: vi.fn(),
      updateBooking: mockUpdateBooking,
      newBooking: vi.fn(),
    });

    const { container } = render(<UpdateBookingDialog id={1} />, {
      wrapper: TestWrapper,
    });

    fireEvent.click(screen.getByTestId("update-button"));
    fireEvent.click(screen.getByTestId("save-changes"));

    await waitFor(() => {
      expect(mockUpdateBooking).toHaveBeenCalledWith(
        expect.objectContaining({
          booking: expect.objectContaining({
            id: mockBooking.id,
          }),
        })
      );
    });

    expect(container).toMatchSnapshot();
  });
});
