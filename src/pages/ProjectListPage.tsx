import type { GetProjectDto } from "../dtos/project.dto";
import { getProjects } from "../services/projectService";
import { useService } from "../hooks/UseService";
import { Modal } from "../components/Modal/Modal"
import { useState } from "react";

export default function ProjectListPage() {
    const { data: projects, loading, error } = useService<GetProjectDto[]>(getProjects);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStacks, setSelectedStacks] = useState<GetProjectDto["techStacks"]>([]);

    const openModal = (techStacks: GetProjectDto["techStacks"]) => {
        setSelectedStacks(techStacks || []);
        setIsModalOpen(true);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Projects</h2>

            {projects?.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No projects found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects?.map((project, idx) => (
                        <div
                            key={idx}
                            className="group relative bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-2xl hover:border-gray-300 transition-all duration-300 overflow-hidden"
                        >
                            {/* Accent line */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

                            <div className="p-6">
                                {/* Project Title */}
                                <div className="mb-4">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                                        {project.title}
                                    </h3>
                                </div>

                                {/* Description */}
                                <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3 text-sm">
                                    {project.description}
                                </p>

                                {/* Button to open modal */}
                                <button
                                    onClick={() => openModal(project.techStacks)}
                                    className="px-4 py-2 text-sm font-medium text-black bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Tech Stacks
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal with tech stacks */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Tech Stacks</h4>
                <div className="space-y-2">
                    {selectedStacks?.map((tech, tIdx) => (
                        <div
                            key={tIdx}
                            className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 transition-colors duration-200"
                        >
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            <div className="min-w-0 flex-1">
                                <span className="font-medium text-gray-900 text-sm block">
                                    {tech.name}
                                </span>
                                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
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