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
                                <Route path="/" element={<HomePage/>} />
                                <Route path="content" element={<ContentListPage />} />
                                <Route path="projects" element={<ProjectListPage />} />
                                <Route path="repos" element={<GithubRepos />} />
                                <Route path="news" element={<NewsList />} />
                                <Route path="login" element={<AuthForm />} />
                                <Route path="create-project"
                                       element={
                                    <ProtectedRoutes>
                                        <CreateProjectPage />
                                    </ProtectedRoutes>
                                    }/>
                                <Route path="create-content"
                                       element={
                                    <ProtectedRoutes>
                                        <CreateContentPage />
                                    </ProtectedRoutes>
                                    }/>
                            </Route>
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PortfolioLayout;
