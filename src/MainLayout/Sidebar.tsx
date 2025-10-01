import { Home, User, FolderKanban, Newspaper, X, File, Github, Mail, Twitter } from "lucide-react";
import { NavLink } from "react-router-dom";
import GradPic from "../assets/images/GradPic.JPG";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

function Sidebar({ isOpen, onClose }: SidebarProps) {
    return (
        <aside
            className={`fixed top-0 left-0 h-full w-64 
            bg-gradient-to-b from-[#8AC6D1] via-[#A1EAFB] to-[#FDFDFD] 
            shadow-2xl z-40 transition-transform duration-300 
            ${isOpen ? "translate-x-0" : "-translate-x-64"}`}
        >
            {/* Close button (mobile only) */}
            <X
                size={30}
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-lg bg-white/20 hover:bg-white/30 md:hidden cursor-pointer"
            />

            {/* Logo & Title */}
            <div className="flex items-center gap-3 px-6 pt-8">
                <img src="/assets/images/P.png" alt="Logo" className="w-12 h-12 rounded-lg shadow-md" />
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    Junior Developer
                </h3>
            </div>

            {/* Main Navigation */}
            <nav className="flex flex-col gap-4 mt-12 px-6">
                <NavLink to="/" className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition">
                    <Home size={18} /> Home
                </NavLink>
                <NavLink to="/repos" className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition">
                    <User size={18} /> Repo
                </NavLink>
                <NavLink to="/projects" className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition">
                    <FolderKanban size={18} /> Projects
                </NavLink>
                <NavLink to="/news" className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition">
                    <Newspaper size={18} /> News
                </NavLink>

                {/* Resume inside Nav */}
                <a
                    href="/assets/files/Resume_Update_09.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-3 py-2 mt-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition"
                >
                    <File size={18} /> Resume
                </a>
            </nav>

            {/* Bottom Section */}
            <div className="absolute bottom-6 left-0 w-full px-6 text-center">
                <img
                    src={GradPic}
                    alt="Grad Picture"
                    className="w-24 h-24 mx-auto mb-4 rounded-full border-2 border-white shadow-lg object-cover hover:scale-105 transition-transform"
                />

                {/* Social Icons */}
                <div className="flex space-x-6 justify-center">
                    <a
                        href="https://twitter.com/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white transition-colors"
                    >
                        <Twitter size={22} />
                    </a>

                    <a
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=johnpatrickboleche@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white transition-colors"
                        title="Email me"
                    >
                        <Mail size={22} />
                    </a>

                    <a
                        href="https://github.com/Perberto07"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white transition-colors"
                    >
                        <Github size={22} />
                    </a>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
