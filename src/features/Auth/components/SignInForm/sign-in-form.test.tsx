/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseUser } from "@/__tests__/test-constants";
import TestWrapper from "@/__tests__/wrapper";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import SignInForm from "./index";

vi.mock("sonner");
vi.mock("@/hooks/useAuth", async () => {
  const actualModule = await vi.importActual("@/hooks/useAuth");
  return {
    ...(actualModule as any),
    useAuth: () => ({
      signIn: vi.fn(),
    }),
  };
});
vi.mock("@tanstack/react-query", async () => {
  const actualModule = await vi.importActual("@tanstack/react-query");
  return {
    ...(actualModule as any),
    useMutation: () => ({
      mutate: vi.fn(),
      isPending: false,
    }),
  };
});
vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

describe("SignInForm", () => {
  test("renders form fields", () => {
    const { container } = render(<SignInForm />, { wrapper: TestWrapper });
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test("handles form submission with correct credentials", async () => {
    render(<SignInForm />, { wrapper: TestWrapper });

    fireEvent.change(screen.getByPlaceholderText("E-mail"), {
      target: { value: baseUser.email },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: baseUser.password },
    });

    fireEvent.click(screen.getByText("Sign In"));

    // TODO: Finish this test
    await waitFor(() => {
      // expect(mockSignIn).toHaveBeenCalled();
      // expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  test("shows error on invalid submit", async () => {
    render(<SignInForm />, { wrapper: TestWrapper });
    fireEvent.click(screen.getByTestId("sign-in-button"));

    await waitFor(() => {
      expect(screen.getAllByTestId("form-message")).toHaveLength(2);
    });
  });
});
