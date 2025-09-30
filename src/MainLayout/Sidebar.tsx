import { Home, User, FolderKanban, Newspaper, X, File } from "lucide-react";
import { NavLink } from "react-router-dom";
import GradPic from "../assets/images/GradPic.JPG";
interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

function Sidebar({ isOpen, onClose }: SidebarProps) {
    return (
        <aside
            className={`fixed top-0 left-0 h-full w-59 bg-gradient-to-b to-[#FDFDFD] via-[#A1EAFB] from-[#8AC6D1] shadow-lg z-40
                transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-59"
                }`}
        >
            {/* Close button (mobile only) */}
            <X
                size={35}
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 md:hidden"
            />

            {/* Flex container to push bottom items down */}
            <div className="flex flex-col h-full justify-between">
                {/* Top Navigation */}
                <nav className="flex flex-col gap-6 mt-16 px-6">
                    <NavLink to="/" className="flex items-center gap-3 text-white hover:text-blue-200">
                        <Home size={18} /> Home
                    </NavLink>
                    <NavLink to="/repos" className="flex items-center gap-3 text-white hover:text-blue-200">
                        <User size={18} /> Repo
                    </NavLink>
                    <NavLink to="/projects" className="flex items-center gap-3 text-white hover:text-blue-200">
                        <FolderKanban size={18} /> Projects
                    </NavLink>
                    <NavLink to="/news" className="flex items-center gap-3 text-white hover:text-blue-200">
                        <Newspaper size={18} /> News
                    </NavLink>

                    <div className="flex items-center gap-3 text-white hover:text-blue-200">
                            <a
                                href="/assets/files/Resume_Update_09.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex gap-3 items-center text-white hover:text-white text-center transition-colors"
                            >
                                <File size={18} /> <span>Resume</span> 
                            </a>
                    </div>
                </nav>

                

                {/* Bottom Section */}
                <div className="px-6 mb-6 justify-center">
                    <img
                        src={GradPic}
                        alt="Grad Picture"
                        className="w-30 h-30 mx-auto mb-6 rounded-full border-2 border-white shadow-md object-cover"
                    />

                    {/* Social Icons */}
                    <div className="flex space-x-4 justify-center">
                        <a href="#" className="text-gray-300 hover:text-white transition-colors">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                            </svg>
                        </a>
                        <a
                            href="https://mail.google.com/mail/?view=cm&fs=1&to=johnpatrickboleche@gmail.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-300 hover:text-white transition-colors"
                            title="Email me"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M12 12.713l11.985-9.713A1 1 0 0023 2H1a1 1 0 00-.985 1.287L12 12.713z" />
                                <path d="M12 14.587L.015 4.874A1 1 0 000 5.763V19a1 1 0 001 1h22a1 1 0 001-1V5.763a1 1 0 00-.015-.889L12 14.587z" />
                            </svg>

 
                        </a>
                        <a href="https://github.com/Perberto07" className="text-gray-300 hover:text-white transition-colors">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;



