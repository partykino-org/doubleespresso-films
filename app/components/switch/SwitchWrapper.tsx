"use client";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "../../common/context/api-context";
import "./styles.css";

const SwitchWrapper = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="theme-mode"
        checked={theme === "dark"}
        onCheckedChange={toggleTheme}
        className={`${theme === "dark" ? "dark" : "light"}`}
      />
      <Label htmlFor="theme-mode capitalize">
        {theme === "dark" ? "Темна" : "Cвітла"} Тема
      </Label>
    </div>
  );
};

export default SwitchWrapper;
