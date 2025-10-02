// ThemeText.tsx
import React from "react";
import { useTheme } from "./ThemeContext";

interface Props {
    children: React.ReactNode;
}

const ThemeText: React.FC<Props> = ({ children }) => {
    const { theme } = useTheme();

    return (
        <span className={theme === "dark" ? "text-white" : "text-black"}>
            {children}
        </span>
    );
};

export default ThemeText;
