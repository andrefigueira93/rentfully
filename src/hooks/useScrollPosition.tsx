import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
} from "react";

// Define the shape of the context
interface ScrollPositionContextData {
  scrollPosition: {
    x: number;
    y: number;
  };
}

// Create a context with the default value of undefined
const ScrollPositionContext = createContext<
  ScrollPositionContextData | undefined
>(undefined);

// Create a provider component that will expose the context
const ScrollPositionProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [scrollPosition, setScrollPosition] = React.useState({
    x: 0,
    y: 0,
  });

  useEffect(
    () => {
      const handleScroll = () => {
        setScrollPosition({ x: window.scrollX, y: window.scrollY });
      };

      // Add the event listener
      window.addEventListener("scroll", handleScroll);

      // Remove the event listener on cleanup
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    },
    [
      // We don't want to run this effect on every render
      // So I'm gonna left this array of dependencies empty
      // https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects
    ]
  );

  return (
    <ScrollPositionContext.Provider value={{ scrollPosition }}>
      {children}
    </ScrollPositionContext.Provider>
  );
};

export default ScrollPositionProvider;

// Create a hook to use the ScrollPositionContext
export const useScrollPosition = () => {
  const ctx = useContext(ScrollPositionContext);
  if (!ctx)
    throw new Error(
      "`useScrollPosition` must be used within a ScrollPositionProvider"
    );
  return ctx;
};
