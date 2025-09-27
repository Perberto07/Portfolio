
import { Outlet } from "react-router-dom";
function MainContent() {
    return (
        <main className="flex-1 bg-gray-100 p-8 min-h-svh">
            <div className="max-w-5xl mx-auto">
                <Outlet/>
            </div>
        </main>
    );
}

export default MainContent;