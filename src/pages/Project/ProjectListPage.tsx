import { useState } from "react";
import { Modal } from "../../components/Modal/Modal";
import type { GetProjectDto } from "../../dtos/project.dto";
import { useService } from "../../hooks/UseService";
import { getProjects } from "../../services/projectService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/Auth/AuthContext";

export default function ProjectListPage() {
    const { data: projects, loading, error } = useService<GetProjectDto[]>(getProjects);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStacks, setSelectedStacks] = useState<GetProjectDto["techStacks"]>([]);
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    

    const openModal = (techStacks: GetProjectDto["techStacks"]) => {
        setSelectedStacks(techStacks || []);
        setIsModalOpen(true);
    };

    const getYoutubeEmbedUrl = (url: string): string => {
        if (!url) return "";

        if (url.includes("youtu.be/")) {
            return url.replace("youtu.be/", "www.youtube.com/embed/");
        }
        if (url.includes("watch?v=")) {
            return url.replace("watch?v=", "embed/");
        }
        return url; // fallback
    };  

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="p-6 max-w-7xl mx-auto transition-colors duration-300">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">Projects</h2>

            {projects?.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400 text-lg">No projects found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects?.map((project, idx) => (
                        <div
                            key={idx}
                            className="group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm hover:shadow-2xl hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 overflow-hidden"
                        >
                            {/* Accent line */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

                            <div className="p-6">
                                {/* Project Title */}
                                <div className="mb-4">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                                        {project.title}
                                    </h3>
                                </div>

                                {/* Video or Placeholder */}
                                <div className="mb-4">
                                    {getYoutubeEmbedUrl(project.videoLink) ? (
                                        <iframe
                                            className="w-full h-48 rounded-lg"
                                            src={getYoutubeEmbedUrl(project.videoLink)}
                                            title={project.title}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    ) : (
                                        <img
                                            className="w-full h-48 object-cover rounded-lg"
                                            src="/assets/images/P.png"
                                            alt="No video available"
                                        />
                                    )}
                                </div>

                                {/* Description */}
                                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed line-clamp-3 text-sm">
                                    {project.description}
                                </p>

                                {/* Button */}
                                <button
                                    onClick={() => openModal(project.techStacks)}
                                    className="px-4 py-2 text-sm font-medium w-full text-white bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 rounded-lg transition-colors"
                                >
                                    Tech Stacks
                                </button>

                                {isAuthenticated && (
                                    <button
                                        onClick={() => navigate(`/projects/${project.id}/edit`)}
                                        className="mt-2 px-4 py-2 text-sm font-medium w-full text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                                    >
                                        Edit
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal with tech stacks */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Tech Stacks</h4>
                <div className="space-y-2">
                    {selectedStacks?.map((tech, tIdx) => (
                        <div
                            key={tIdx}
                            className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-100 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                        >
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            <div className="min-w-0 flex-1">
                                <span className="font-medium text-gray-900 dark:text-gray-100 text-sm block">
                                    {tech.name}
                                </span>
                                <p className="text-xs text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
                                    {tech.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </Modal>

            
        </div>

    );
}
//const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//const [selectedProject, setSelectedProject] = useState<GetProjectDto | null>(null);
//<button
//    onClick={() => {
//        setSelectedProject(project);
//        setIsEditModalOpen(true);
//    }}
//    className="ml-2 px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
//>
//    Edit
//</button>
{/*<Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>*/ }
{/*    {selectedProject && (*/ }
{/*        <UpdateProject*/ }
{/*            project={selectedProject}*/ }
{/*            onSuccess={() => {*/ }
{/*                setIsEditModalOpen(false);*/ }
{/*                window.location.reload(); // refresh to see updates (or re-fetch)*/ }
{/*            }}*/ }
{/*        />*/ }
{/*    )}*/ }
{/*</Modal>*/ }
//import UpdateProject from "./UpdateProject";