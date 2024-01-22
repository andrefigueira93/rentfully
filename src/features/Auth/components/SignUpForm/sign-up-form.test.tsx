/* eslint-disable @typescript-eslint/no-explicit-any */
import { newTestUser } from "@/__tests__/test-constants";
import TestWrapper from "@/__tests__/wrapper";
import * as AuthHook from "@/hooks/useAuth";
import { AUTH_REGISTERED_USERS } from "@/infrastructure/constants";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import SignUpForm from "./index";

vi.mock("bcryptjs");
vi.mock("sonner");
vi.mock("@/hooks/useAuth", async () => {
  const actualModule = await vi.importActual("@/hooks/useAuth");
  return {
    ...(actualModule as any),
    useAuth: () => ({
      signUp: vi.fn(),
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

describe("SignUpForm", () => {
  let container: HTMLElement;
  let firstNameInput: HTMLElement;
  let lastNameInput: HTMLElement;
  let emailInput: HTMLElement;
  let passwordInput: HTMLElement;
  let checkbox: HTMLElement;

  beforeEach(() => {
    vi.clearAllMocks();
    const { container: component } = render(<SignUpForm />, {
      wrapper: TestWrapper,
    });
    container = component;
    firstNameInput = screen.getByTestId("firstName-input");
    lastNameInput = screen.getByTestId("lastName-input");
    emailInput = screen.getByTestId("email-input");
    passwordInput = screen.getByTestId("password-input");
    checkbox = screen.getByRole("checkbox");
  });

  test("renders form fields", () => {
    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(checkbox).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test("handles form submission with correct credentials", async () => {
    localStorage.removeItem(AUTH_REGISTERED_USERS);

    const mockSignUp = vi.fn();
    vi.spyOn(AuthHook, "useAuth").mockReturnValue({
      user: null,
      isAuthenticated: false,
      signIn: vi.fn(),
      signOut: vi.fn(),
      signUp: mockSignUp,
    });

    fireEvent.change(emailInput, {
      target: { value: newTestUser.email },
    });
    fireEvent.change(passwordInput, {
      target: { value: newTestUser.password },
    });
    fireEvent.change(firstNameInput, {
      target: { value: newTestUser.firstName },
    });
    fireEvent.change(lastNameInput, {
      target: { value: newTestUser.lastName },
    });
    fireEvent.click(checkbox);

    fireEvent.click(screen.getByTestId("sign-up-button"));

    // TODO: Finish this test
    // await waitFor(
    //   () => {
    //     expect(mockSignUp).toHaveBeenCalled();
    //   },
    //   {
    //     timeout: 2000,
    //   }
    // );
  });

  test("shows error on invalid submit", async () => {
    fireEvent.click(screen.getByTestId("sign-up-button"));
    await waitFor(() => {
      expect(screen.getAllByTestId("form-message")).toHaveLength(2);
    });
  });
});
