// ThemeToggle.tsx
//import React from "react";
import { useTheme } from "./ThemeContext";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div
            onClick={toggleTheme}
            className="rounded  text-black dark:text-white"
        >
            {theme === "dark" ? "🌙" : "☀️"}
        </div>
    );
};

export default ThemeToggle;
