import TestWrapper from "@/__tests__/wrapper";
import { renderHook } from "@testing-library/react-hooks";
import { useTheme } from "../useTheme";

describe("useTheme hook", () => {
  test('should set the theme to "system" by default', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: TestWrapper,
    });

    expect(result.current.theme).toBe("system");
    expect(result).toMatchSnapshot();
  });

  test("should set the theme to the provided value", () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: TestWrapper,
    });

    const newTheme = "dark";

    result.current.setTheme(newTheme);

    expect(result.current.theme).toBe(newTheme);
    expect(result).toMatchSnapshot();
  });
});
