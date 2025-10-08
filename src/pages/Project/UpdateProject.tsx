import React from "react";
import ReusableForm, { type FieldConfig, type ChildConfig } from "../../components/Form/ReusableForm";
import type { GetProjectDto, CreateProjectDto } from "../../dtos/project.dto";
import { updateProject } from "../../services/projectService";


type Props = {
    project: GetProjectDto; // existing project data to prefill the form
    onSuccess?: () => void;
};

const UpdateProject: React.FC<Props> = ({ project, onSuccess }) => {
    // Define parent fields (main project info)
    const parentFields: FieldConfig[] = [
        { name: "title", label: "Project Title", type: "text", placeholder: "Enter project title", required: true },
        { name: "description", label: "Description", type: "textarea", placeholder: "Enter project description", required: true },
        { name: "videoLink", label: "Video Link", type: "text", placeholder: "Paste video link" },
    ];

    // Define child fields (tech stacks)
    const childConfig: ChildConfig = {
        name: "techStacks",
        label: "Tech Stacks",
        fields: [
            { name: "name", label: "Name", type: "text", placeholder: "e.g. React" },
            { name: "description", label: "Description", type: "text", placeholder: "e.g. Frontend framework" },
        ],
    };

    // Handle submission
    const handleSubmit = async (data: CreateProjectDto) => {
        try {
            await updateProject(project.id, data);
            alert("✅ Project updated successfully!");
            onSuccess?.();
        } catch (error) {
            console.error(error);
            alert("❌ Failed to update project.");
        }
    };

    return (
        <ReusableForm<CreateProjectDto>
            title="Update Project"
            parentFields={parentFields}
            childConfig={childConfig}
            initialData={project}
            onSubmit={handleSubmit}
        />
    );
};

export default UpdateProject;
