import { themeAtom } from "@/store/global-store";
import { useAtom } from "jotai";
import { createContext, useContext, useEffect } from "react";

// Theme types
type Theme = "dark" | "light" | "system";

// Define the shape of the props
type ThemeProviderProps = {
  children: React.ReactNode;
};

// Define the shape of the context
type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

// Define the initial state of the context
const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

// Create a context with the default value of undefined
const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

// Create a provider component that will expose the context
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [theme, setTheme] = useAtom(themeAtom);

  // Set the theme on first load
  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

// Create a hook to use the ThemeContext
export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
