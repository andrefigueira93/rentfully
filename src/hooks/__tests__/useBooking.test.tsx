/* eslint-disable @typescript-eslint/no-explicit-any */
import TestWrapper from "@/__tests__/wrapper";
import { act, renderHook } from "@testing-library/react-hooks";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";
import { describe, test, vi } from "vitest";
import { baseUser } from "../../__tests__/test-constants";
import { useAuth } from "../useAuth";
import { useBooking } from "../useBooking";

vi.mock("bcryptjs");
vi.mock("react-router-dom", async () => {
  const actualModule = await vi.importActual("react-router-dom");
  return {
    ...(actualModule as any),
    useNavigate: vi.fn(),
  };
});
vi.mock("sonner", () => ({
  toast: vi.fn(),
}));

describe("useBooking hook", () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(bcrypt.compareSync).mockReturnValue(true);
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  test("Should be able to add a new booking", () => {
    const { result } = renderHook(() => useBooking(), { wrapper: TestWrapper });
    const { result: authHook } = renderHook(() => useAuth(), {
      wrapper: TestWrapper,
    });

    act(() => {
      authHook.current.signIn({
        email: baseUser.email,
        password: baseUser.password,
      });
    });

    act(() => {
      result.current.newBooking(1);
    });

    expect(result.current.bookings).toHaveLength(2);
    // expect(result).toMatchSnapshot();
    // Snapshot would not match because of the random data
  });

  test("Should be able to update a booking", () => {
    const { result } = renderHook(() => useBooking(), { wrapper: TestWrapper });

    expect(result?.current?.bookings?.[0]?.guests).toBe(1);

    act(() => {
      result.current.updateBooking({
        booking: {
          id: 1,
          guests: 2,
        },
      });
    });

    expect(result?.current?.bookings?.[0]?.guests).toBe(2);
    // expect(result).toMatchSnapshot();
    // Snapshot would not match because of the date
  });

  test("Should be able to delete a booking", () => {
    const { result } = renderHook(() => useBooking(), { wrapper: TestWrapper });

    act(() => {
      result.current.deleteBooking(1);
    });

    expect(result.current.bookings).toHaveLength(1);
    // expect(result).toMatchSnapshot();
    // Snapshot would not match because of the date
  });
});
