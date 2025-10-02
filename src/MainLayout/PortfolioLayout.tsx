import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import MainContent from "./MainContent";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ContentListPage from "../pages/Content/ContentListPage";
import ProjectListPage from "../pages/Project/ProjectListPage";
import GithubRepos from "../pages/GithubRepos";
import NewsList from "../pages/NewsList";
import AuthForm from "../pages/AuthForm";
import CreateProjectPage from "../pages/Project/CreateProjectpage";
import ProtectedRoutes from "../components/Auth/ProtectedRoutes";
import HomePage from "../pages/HomePage";
import CreateContentPage from "../pages/Content/CreateContentPage";

function PortfolioLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(true); // default open on desktop

    return (
        <div className="min-h-screen w-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
            <div className="flex flex-1 relative">
                {/* Sidebar */}
                <Sidebar
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                    className="bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
                />

                {/* Main content wrapper */}
                <div
                    className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? "ml-60" : "ml-0"
                        }`}
                >
                    <Header
                        onSidebarToggle={() => setSidebarOpen((open) => !open)}
                        className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                    />

                    {/* Body */}
                    <div className="flex-1 bg-white dark:bg-gray-900 text-black dark:text-gray-100 transition-colors">
                        <Routes>
                            <Route element={<MainContent />}>
                                <Route path="/" element={<HomePage />} />
                                <Route path="content" element={<ContentListPage />} />
                                <Route path="projects" element={<ProjectListPage />} />
                                <Route path="repos" element={<GithubRepos />} />
                                <Route path="news" element={<NewsList />} />
                                <Route path="login" element={<AuthForm />} />
                                <Route
                                    path="create-project"
                                    element={
                                        <ProtectedRoutes>
                                            <CreateProjectPage />
                                        </ProtectedRoutes>
                                    }
                                />
                                <Route
                                    path="create-content"
                                    element={
                                        <ProtectedRoutes>
                                            <CreateContentPage />
                                        </ProtectedRoutes>
                                    }
                                />
                            </Route>
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PortfolioLayout;
