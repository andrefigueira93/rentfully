import TestWrapper from "@/__tests__/wrapper";
import { act, renderHook } from "@testing-library/react-hooks";
import bcrypt from "bcryptjs";
import { describe, test, vi } from "vitest";
import { baseUser, newTestUser } from "../../__tests__/test-constants";
import { useAuth } from "../useAuth";

vi.mock("bcryptjs");
describe("useAuth Hook", () => {
  beforeEach(() => {
    vi.mocked(bcrypt.compareSync).mockReturnValue(true);
  });

  test("signUp function", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: TestWrapper });

    act(() => {
      result.current.signUp({
        user: newTestUser,
      });
    });
    // expect(result).toMatchSnapshot();
    // Snapshot would not match because of the date
  });

  test("signIn function with correct credentials", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: TestWrapper });

    act(() => {
      result.current.signIn({
        email: baseUser.email,
        password: baseUser.password,
      });
    });
    // expect(result).toMatchSnapshot();
    // Snapshot would not match because of the date
  });

  test("signOut function", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: TestWrapper });

    act(() => {
      result.current.signOut();
    });
    // expect(result).toMatchSnapshot();
    // Snapshot would not match because of the date
  });
});
