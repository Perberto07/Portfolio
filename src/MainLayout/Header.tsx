import { Menu } from "lucide-react";
import WeatherWidget from "../components/Widgets/WeatherWidget";

function Header({ onSidebarToggle }: { onSidebarToggle: () => void }) {
    return (
        <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white shadow-lg relative overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent"></div>
            <div className="absolute top-0 right-0 w-96 h-32 bg-gradient-to-l from-white/5 to-transparent rounded-full -translate-y-16 translate-x-32"></div>
            <div className="container mx-auto px-6 py-5 relative z-10">

                <div className="flex items-center justify-between">

                    {/* Sidebar Toggle Button */}
                    

                    {/* Logo / Title */}
                    <div className="flex items-center gap-3">
                        <Menu size={25} color="#3338A0" onClick={onSidebarToggle} className="ml-2" />
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                            Junior Developer
                        </h3>
                    </div>

                    <WeatherWidget />

                </div>
            </div>
        </header>
    );
}

export default Header;
