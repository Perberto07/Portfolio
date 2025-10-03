// CreateContentPage.tsx
import ReusableForm, { type ChildConfig, type FieldConfig } from "../../components/Form/ReusableForm";
import type { CreateContentDto, ItemDto } from "../../dtos/content.dto";
import { createContent } from "../../services/contentService";

export default function CreateContentPage() {
    const parentFields: FieldConfig[] = [
        { name: "name", label: "Content Name", type: "text", placeholder: "Enter content name", required: true },
    ];

    const childConfig: ChildConfig = {
        name: "items",
        label: "Items",
        fields: [
            { name: "header", label: "Header", type: "text", placeholder: "Enter header" },
            { name: "textContent", label: "Text Content", type: "textarea", placeholder: "Enter text" },
        ],
    };

    const handleSubmit = async (data: CreateContentDto) => {
    await createContent(data);
    alert("Content created!");
  };

    return (
      <ReusableForm<CreateContentDto, ItemDto>
          title="Create Content"
          parentFields={parentFields}
          childConfig={childConfig}
          onSubmit={handleSubmit}
    />
  );
}
