import TestWrapper from "@/__tests__/wrapper";
import { act, renderHook } from "@testing-library/react-hooks";
import { useScrollPosition } from "../useScrollPosition";

describe("useScrollPosition hook", () => {
  test("should throw an error when used outside of ScrollPositionProvider", () => {
    const { result } = renderHook(() => useScrollPosition());

    expect(result.error).toEqual(
      Error("`useScrollPosition` must be used within a ScrollPositionProvider")
    );
  });

  test("should provide the scroll position", () => {
    const { result } = renderHook(() => useScrollPosition(), {
      wrapper: TestWrapper,
    });

    expect(result).toMatchSnapshot();
    expect(result.current.scrollPosition).toEqual({ x: 0, y: 0 });
  });

  test("should update the scroll position on scroll", async () => {
    const { result } = renderHook(() => useScrollPosition(), {
      wrapper: TestWrapper,
    });

    vi.spyOn(window, "scrollTo").mockImplementation(() => {});

    // Simulate scroll event
    act(() => {
      window.scrollTo(10, 0);
    });

    // Wait for the state to update
    expect(window.scrollTo).toHaveBeenCalledWith(10, 0);
    expect(result).toMatchSnapshot();
  });
});
