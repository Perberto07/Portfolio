import ContentListPage from "../pages/ContentListPage";
import ProjectListPage from "../pages/ProjectListPage";
//import CreateContentPage from "../pages/CreateContentPage";
//import ProjectListPage from "../pages/ProjectListPage";
import GithubRepos from "../pages/GithubRepos";

function MainContent() {
    return (
        <main className="flex-1 bg-gray-100 p-8">
            <div className="max-w-5xl mx-auto">
                <div className="bg-white rounded-lg shadow-md p-8 mb-8 m-7">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to My Portfolio</h2>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                        I'm a passionate full-stack developer with expertise in modern web technologies.
                        I love creating efficient, scalable, and user-friendly applications.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-blue-50 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold text-blue-800 mb-3">Frontend</h3>
                            <p className="text-gray-700">React, TypeScript, Tailwind CSS, Next.js</p>
                        </div>
                        <div className="bg-green-50 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold text-green-800 mb-3">Backend</h3>
                            <p className="text-gray-700">Node.js, Express, Python, PostgreSQL</p>
                        </div>
                        <div className="bg-purple-50 p-6 rounded-lg">
                            <h3 className="text-xl font-semibold text-purple-800 mb-3">Tools</h3>
                            <p className="text-gray-700">Git, Docker, AWS, CI/CD</p>
                        </div>
                    </div>
                </div>

                <ContentListPage />
                <ProjectListPage />
                <GithubRepos/>
            </div>
        </main>
    );
}

export default MainContent;