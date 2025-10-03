//import { useState } from "react";
import type { CreateProjectDto, TechStackDto } from "../../dtos/project.dto";
import { createProject } from "../../services/projectService";
import ReusableForm, { type ChildConfig, type FieldConfig } from "../../components/Form/ReusableForm";


export default function CreateProjectPage() {
    //const [project, setProject] = useState<CreateProjectDto>({
    //    title: "",
    //    description: "",
    //    videoLink: "",
    //    techStacks: [],
    //});

    const parentFields: FieldConfig[] = [
        {name: "title", label: "Project Name", type: "text", placeholder: "Enter Projectt Name", required: true },
        {name: "description", label: "Project Description", type: "textarea", placeholder: "Enter Projectt Description", required: true },
        {name: "VideoLink", label: "Project Video URL", type: "text", placeholder: "Enter Projectt Video URL", required: false },
    ]

    const childConfig: ChildConfig = {
        name: "techStack",
        label: "TechStacks",
        fields: [
            {name: "name", label: "Name", type: "text", placeholder: "Enter Name" },
            { name: "description", label: "Description", type: "textarea", placeholder: "Enter Description" },
        ]
    }

    //const [tech, setTech] = useState<TechStackDto>({ name: "", description: "" });
    //const [errors, setErrors] = useState<string[]>([]);

    //const handleAddTech = () => {
    //    if (!tech.name.trim()) {
    //        alert("Tech Name is required.");
    //        return;
    //    }
    //    setProject((prev) => ({
    //        ...prev,
    //        techStacks: [...prev.techStacks, tech],
    //    }));
    //    setTech({ name: "", description: "" });
    //};

    //const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    //    e.preventDefault(); // prevent default form submission

    //    // Custom validation for tech stacks
    //    if (project.techStacks.length === 0) {
    //        setErrors(["At least one Tech Stack is required."]);
    //        return;
    //    }
    //    setErrors([]); // clear errors

    //    try {
    //        const result = await createProject(project);
    //        alert("Project created successfully!");
    //        console.log(result);
    //        setProject({ title: "", description: "", videoLink: "", techStacks: [] });
    //    } catch (error) {
    //        alert("Failed to create project.");
    //        console.error(error);
    //    }
    //};
    const handleSubmit = async (data: CreateProjectDto) => {
        try {
            await createProject(data);
            alert("Project created");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ReusableForm<CreateProjectDto, TechStackDto>
            title="Create Project"
            parentFields={parentFields}
            childConfig={childConfig}
            onSubmit={handleSubmit}
        />
    );
}
