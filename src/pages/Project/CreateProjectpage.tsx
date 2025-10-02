import { useState } from "react";
import type { CreateProjectDto, TechStackDto } from "../../dtos/project.dto";
import { createProject } from "../../services/projectService";


export default function CreateProjectPage() {
    const [project, setProject] = useState<CreateProjectDto>({
        title: "",
        description: "",
        videoLink: "",
        techStacks: [],
    });

    const [tech, setTech] = useState<TechStackDto>({ name: "", description: "" });
    const [errors, setErrors] = useState<string[]>([]);

    const handleAddTech = () => {
        if (!tech.name.trim()) {
            alert("Tech Name is required.");
            return;
        }
        setProject((prev) => ({
            ...prev,
            techStacks: [...prev.techStacks, tech],
        }));
        setTech({ name: "", description: "" });
    };

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // prevent default form submission

        // Custom validation for tech stacks
        if (project.techStacks.length === 0) {
            setErrors(["At least one Tech Stack is required."]);
            return;
        }
        setErrors([]); // clear errors

        try {
            const result = await createProject(project);
            alert("Project created successfully!");
            console.log(result);
            setProject({ title: "", description: "", videoLink: "", techStacks: [] });
        } catch (error) {
            alert("Failed to create project.");
            console.error(error);
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Create Project</h2>

            {/* Display errors */}
            {errors.length > 0 && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                    <ul>
                        {errors.map((err, idx) => (
                            <li key={idx}>⚠️ {err}</li>
                        ))}
                    </ul>
                </div>
            )}

            <form onSubmit={handleCreate}>
                <input
                    className="border p-2 w-full mb-3"
                    type="text"
                    placeholder="Project Title"
                    value={project.title}
                    required
                    onChange={(e) => setProject({ ...project, title: e.target.value })}
                />

                <textarea
                    className="border p-2 w-full mb-3"
                    placeholder="Project Description"
                    value={project.description}
                    required
                    onChange={(e) =>
                        setProject({ ...project, description: e.target.value })
                    }
                />

                <input
                    className="border p-2 w-full mb-3"
                    type="text"
                    placeholder="Project Video Link"
                    value={project.videoLink}
                    onChange={(e) => setProject({ ...project, videoLink: e.target.value })}
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
                        type="button"
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
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    Create Project
                </button>
            </form>
        </div>
    );
}
