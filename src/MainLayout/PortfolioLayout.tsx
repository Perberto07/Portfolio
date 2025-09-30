import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import MainContent from "./MainContent";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ContentListPage from "../pages/ContentListPage";
import ProjectListPage from "../pages/ProjectListPage";
import GithubRepos from "../pages/GithubRepos";
import NewsList from "../pages/NewsList";

function PortfolioLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(true); // default open on desktop

    return (
        <div className="min-h-screen w-screen flex flex-col">
            <div className="flex flex-1 relative">
                {/* Sidebar */}
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />


                {/* Main content wrapper */}
                <div
                    className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? "ml-59" : "ml-0"
                        }`}
                >
                    <Header onSidebarToggle={() => setSidebarOpen((open) => !open)} />
                    <div className="flex-1">
                        <Routes>
                            <Route element={<MainContent />}>
                                <Route path="content" element={<ContentListPage />} />
                                <Route path="projects" element={<ProjectListPage />} />
                                <Route path="repos" element={<GithubRepos />} />
                                <Route path="news" element={<NewsList />} />
                            </Route>
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default PortfolioLayout;
