import { Menu } from "lucide-react";
import WeatherWidget from "../components/Widgets/WeatherWidget";
import ThemeToggle from "../components/Theme/ThemeToggle";

interface HeaderProps {
    onSidebarToggle: () => void;
    className?: string;   // ✅ allow className
}
function Header({ onSidebarToggle, className = "" }: HeaderProps) {
    return (
        <header
            className={`bg-white dark:bg-gray-800 shadow-md relative overflow-hidden transition-colors ${className}`}
        >
            <div className="container bg-white dark:bg-gray-800 mx-auto px-10 py-4 relative z-10">
                <div className="flex items-center justify-between">

                    {/* Sidebar Toggle + Logo/Title */}
                    <div className="flex items-center gap-3">
                        <div
                            onClick={onSidebarToggle}
                            className="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-600 transition"
                        >
                            <Menu
                                size={24}
                                className="text-blue-700 dark:text-blue-300 transition-colors"
                            />
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-blue-800 dark:text-blue-200 transition-colors">
                            Junior Developer
                        </h3>
                    </div>

                    {/* Weather Widget + Theme Toggle */}
                    <div className="hidden sm:flex items-center gap-3">
                        <WeatherWidget />
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
