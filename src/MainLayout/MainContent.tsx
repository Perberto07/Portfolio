
import { Outlet } from "react-router-dom";
function MainContent() {
    return (
        <main className="flex-1 bg-gray-100 dark:bg-gray-700 p-8 min-h-[100svh] transition-colors duration-300">
            <div className="max-w-5xl mx-auto">
                <Outlet />
            </div>
        </main>

    );
}

export default MainContent;