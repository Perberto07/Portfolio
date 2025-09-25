import { useState } from "react";
import type { CreateProjectDto, TechStackDto } from "../dtos/project.dto";
import { createProject } from "../services/projectService";

export default function CreateProjectPage() {
    const [project, setProject] = useState<CreateProjectDto>({
        title: "",
        description: "",
        techStacks: [],
    });

    const [tech, setTech] = useState<TechStackDto>({ name: "", description: "" });

    const handleAddTech = () => {
        if (!tech.name.trim()) return;
        setProject((prev) => ({
            ...prev,
            techStacks: [...prev.techStacks, tech],
        }));
        setTech({ name: "", description: "" }); // reset
    };

    const handleCreate = async () => {
        try {
            const result = await createProject(project);
            alert("Project created successfully!");
            console.log(result);
            setProject({ title: "", description: "", techStacks: [] }); // reset
        } catch (error) {
            alert("Failed to create project.");
            console.error(error);
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Create Project</h2>

            <input
                className="border p-2 w-full mb-3"
                type="text"
                placeholder="Project Title"
                value={project.title}
                onChange={(e) => setProject({ ...project, title: e.target.value })}
            />

            <textarea
                className="border p-2 w-full mb-3"
                placeholder="Project Description"
                value={project.description}
                onChange={(e) =>
                    setProject({ ...project, description: e.target.value })
                }
            />

            <div className="border p-3 mb-4">
                <h3 className="font-semibold mb-2">Add Tech Stack</h3>
                <input
                    className="border p-2 w-full mb-2"
                    type="text"
                    placeholder="Tech Name"
                    value={tech.name}
                    onChange={(e) => setTech({ ...tech, name: e.target.value })}
                />
                <input
                    className="border p-2 w-full mb-2"
                    type="text"
                    placeholder="Tech Description"
                    value={tech.description}
                    onChange={(e) => setTech({ ...tech, description: e.target.value })}
                />
                <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={handleAddTech}
                >
                    Add Tech
                </button>

                <ul className="mt-3">
                    {project.techStacks.map((t, idx) => (
                        <li key={idx} className="text-sm">
                            ✅ {t.name} - {t.description}
                        </li>
                    ))}
                </ul>
            </div>

            <button
                className="bg-green-600 text-white px-4 py-2 rounded"
                onClick={handleCreate}
            >
                Create Project
            </button>
        </div>
    );
}
