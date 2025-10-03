// ReusableForm.tsx
import React, { useState } from "react";

export type FieldConfig = {
    name: string;
    label: string;
    type: "text" | "textarea" | "number" | "email" | "password"; // add more types if needed
    placeholder?: string;
    required?: boolean;
};

export type ChildConfig = {
    name: string; // e.g. "items" or "techStacks"
    label: string;
    fields: FieldConfig[];
};

export type ReusableFormProps<
    ParentData extends Record<string, unknown>,
    ChildData extends Record<string, unknown> = never
> = {
    title: string;
    parentFields: FieldConfig[];
    childConfig?: ChildConfig;
    onSubmit: ChildData extends never
    ? (data: ParentData) => Promise<void>
    : (data: ParentData & { [key: string]: ChildData[] }) => Promise<void>;
};


const ReusableForm = <
    ParentData extends Record<string, unknown> = Record<string, unknown>,
    ChildData extends Record<string, unknown> = Record<string, unknown>
>({
    title,
    parentFields,
    childConfig,
    onSubmit,
}: ReusableFormProps<ParentData, ChildData>) => {

    const [formData, setFormData] = useState<ParentData>({} as ParentData);
    const [childData, setChildData] = useState<ChildData>({} as ChildData);
    const [childList, setChildList] = useState<ChildData[]>([]);

    const handleParentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleChildChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setChildData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddChild = () => {
        if (!childConfig) return;
        if (!Object.values(childData).some(val => String(val).trim() !== "")) return;
        setChildList(prev => [...prev, childData]);
        setChildData({} as ChildData);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Type-safe construction of finalData
        let finalData: ParentData & { [key: string]: ChildData[] };

        if (childConfig) {
            finalData = {
                ...(formData as ParentData),
                [childConfig.name]: childList as ChildData[],
            };
        } else {
            finalData = formData as ParentData & { [key: string]: ChildData[] };
        }

        await onSubmit(finalData);

        setFormData({} as ParentData);
        setChildList([]);
        setChildData({} as ChildData);
    };

    return (
        <div className="p-6 max-w-xl mx-auto transition-colors duration-300 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">{title}</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Parent fields */}
                {parentFields.map((field) => (
                    <div key={field.name}>
                        <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">{field.label}</label>
                        {field.type === "textarea" ? (
                            <textarea
                                name={field.name}
                                placeholder={field.placeholder}
                                value={String(formData[field.name] ?? "")}
                                required={field.required}
                                onChange={handleParentChange}
                                className="border border-gray-300 dark:border-gray-700 p-3 w-full rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
                            />
                        ) : (
                            <input
                                type={field.type}
                                name={field.name}
                                placeholder={field.placeholder}
                                value={String(formData[field.name] ?? "")}
                                required={field.required}
                                onChange={handleParentChange}
                                className="border border-gray-300 dark:border-gray-700 p-3 w-full rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
                            />
                        )}
                    </div>
                ))}

                {/* Child fields (dynamic list) */}
                {childConfig && (
                    <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg bg-gray-100 dark:bg-gray-800 transition-colors">
                        <h3 className="font-semibold mb-3 text-gray-700 dark:text-gray-300">{childConfig.label}</h3>
                        {childConfig.fields.map((field) => (
                            <div key={field.name}>
                                <input
                                    type={field.type}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    value={String(childData[field.name] ?? "")}
                                    onChange={handleChildChange}
                                    className="border border-gray-300 dark:border-gray-700 p-2 w-full mb-3 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
                                />
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={handleAddChild}
                            className="bg-blue-500 hover:bg-blue-600 dark:bg-green-400 dark:hover:bg-green-500 text-white px-4 py-2 rounded-lg transition"
                        >
                            Add {childConfig.label}
                        </button>

                        <ul className="mt-4 text-sm text-gray-600 dark:text-gray-300 space-y-1">
                            {childList.map((c, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                    <span className="text-green-500">✅</span> {Object.values(c).map((v) => String(v)).join(" - ")}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold transition"
                >
                    Submit
                </button>
            </form>
        </div>

    );
};

export default ReusableForm;
