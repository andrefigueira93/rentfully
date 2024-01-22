/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen } from "@testing-library/react";
import * as jotai from "jotai";
import { describe, expect, test, vi } from "vitest";
import ThemeSwitcher from "./index";

vi.mock("jotai", () => ({
  useAtom: vi.fn(),
}));

describe("ThemeSwitcher Component", () => {
  test("renders and toggles theme", () => {
    const mockSetTheme = vi.fn();
    (jotai.useAtom as any).mockReturnValue(["light", mockSetTheme]);

    render(<ThemeSwitcher />);
    const switchButton = screen.getByRole("switch");
    expect(switchButton).toBeInTheDocument();

    // Simulate clicking the switch to toggle the theme
    fireEvent.click(switchButton);
    expect(mockSetTheme).toHaveBeenCalledWith(expect.any(Function));

    // Change the theme to 'dark' and update the mock
    (jotai.useAtom as any).mockReturnValue(["dark", mockSetTheme]);
    fireEvent.click(switchButton);
    expect(mockSetTheme).toHaveBeenCalledWith(expect.any(Function));
  });
});
