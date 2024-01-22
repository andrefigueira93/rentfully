import { themeAtom } from "@/store/global-store";
import { useAtom } from "jotai";
import React, { useMemo } from "react";
import { Switch } from "@/components/ui/switch";

const ThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = useAtom(themeAtom);

  function toggleTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  const checked = useMemo(() => theme === "dark", [theme]);

  return <Switch checked={checked} onCheckedChange={toggleTheme} />;
};

export default ThemeSwitcher;
