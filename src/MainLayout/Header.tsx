import { Menu } from "lucide-react";
import WeatherWidget from "../components/Widgets/WeatherWidget";

function Header({ onSidebarToggle }: { onSidebarToggle: () => void }) {
    return (
        <header className="bg-white shadow-md relative overflow-hidden">
            {/* Subtle gradient background overlay */}
            {/*<div className="absolute inset-0 bg-gradient-to-r from-blue-100/40 to-transparent"></div>*/}

            <div className="container mx-auto px-10 py-4 relative z-10">
                <div className="flex items-center justify-between">

                    {/* Sidebar Toggle + Logo/Title */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onSidebarToggle}
                            className="p-2 rounded-lg hover:bg-blue-100 transition"
                        >
                            <Menu size={24} className="text-blue-700" />
                        </button>
                        <h3 className="text-xl md:text-2xl font-bold text-blue-800">
                            Junior Developer
                        </h3>
                    </div>

                    {/* Weather Widget */}
                    <div className="hidden sm:block">
                        <WeatherWidget />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
