import { Home, User, FolderKanban, Mail, Menu, X } from "lucide-react";
import { useState } from "react";
import WeatherWidget from "../components/Widgets/WeatherWidget";

function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white shadow-lg relative overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent"></div>
            <div className="absolute top-0 right-0 w-96 h-32 bg-gradient-to-l from-white/5 to-transparent rounded-full -translate-y-16 translate-x-32"></div>

            <div className="container mx-auto px-6 py-5 relative z-10">
                <div className="flex items-center justify-between">
                    {/* Logo / Title */}
                    <div className="flex items-center group">
                        <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mr-3 group-hover:bg-white/20 transition-all duration-300">
                            <div className="w-6 h-6 bg-gradient-to-br from-blue-200 to-white rounded-md flex items-center justify-center">
                                <span className="text-blue-600 font-bold text-sm">JD</span>
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                            Junior Developer
                        </h3>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-2">
                        <a
                            href="#home"
                            className="flex items-center gap-3 p-1 py-2.5 rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all duration-300 group border border-transparent hover:border-white/20"
                        >
                            <Home size={16} className="text-blue-100 group-hover:text-white" />
                            <span className="text-blue-50 group-hover:text-white font-medium text-sm">
                                Home
                            </span>
                        </a>

                        <a
                            href="#about"
                            className="flex items-center gap-3 p-1 py-2.5 rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all duration-300 group border border-transparent hover:border-white/20"
                        >
                            <User size={16} className="text-blue-100 group-hover:text-white" />
                            <span className="text-blue-50 group-hover:text-white font-medium text-sm">
                                About
                            </span>
                        </a>

                        <a
                            href="#projects"
                            className="flex items-center gap-3 p-1 py-2.5 rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all duration-300 group border border-transparent hover:border-white/20"
                        >
                            <FolderKanban
                                size={16}
                                className="text-blue-100 group-hover:text-white"
                            />
                            <span className="text-blue-50 group-hover:text-white font-medium text-sm">
                                Projects
                            </span>
                        </a>

                        <a
                            href="#contact"
                            className="flex items-center gap-3 p-1 py-2.5 rounded-xl hover:bg-white/10 backdrop-blur-sm transition-all duration-300 group border border-transparent hover:border-white/20"
                        >
                            <Mail size={16} className="text-blue-100 group-hover:text-white" />
                            <span className="text-blue-50 group-hover:text-white font-medium text-sm">
                                Contact
                            </span>
                        </a>

                        <WeatherWidget />
                    </nav>

                    {/* Mobile Toggle */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
                    >
                        {isOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile Sidebar */}
            {isOpen && (
                <div className="fixed top-0 left-0 w-64 h-full bg-gradient-to-b from-blue-700 to-indigo-900 shadow-lg p-6 z-50 md:hidden">
                    <button
                        onClick={toggleMenu}
                        className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20"
                    >
                        <X size={20} />
                    </button>


                    
                    <nav className="flex flex-col gap-6 mt-10">
                        <WeatherWidget />
                        <a href="#home" className="flex items-center gap-3 text-white hover:text-blue-200">
                            <Home size={18} /> Home
                        </a>
                        <a href="#about" className="flex items-center gap-3 text-white hover:text-blue-200">
                            <User size={18} /> About
                        </a>
                        <a href="#projects" className="flex items-center gap-3 text-white hover:text-blue-200">
                            <FolderKanban size={18} /> Projects
                        </a>
                        <a href="#contact" className="flex items-center gap-3 text-white hover:text-blue-200">
                            <Mail size={18} /> Contact
                        </a>
                    </nav>
                </div>
            )}
        </header>
    );
}

export default Header;
