import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProjectById, updateProject } from "../../services/projectService";
import type { CreateProjectDto } from "../../dtos/project.dto";

export default function ProjectEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CreateProjectDto>({
    title: "",
    description: "",
    videoLink: "",
    techStacks: [],
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        if (!id) return;
        const res = await getProjectById(Number(id));
        const projectData = Array.isArray(res) ? res[0] : res;
        setFormData({
          title: projectData.title,
          description: projectData.description,
          videoLink: projectData.videoLink,
          techStacks: projectData.techStacks,
        });
      } catch (err: any) {
        setError(err.message || "Failed to load project");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    try {
      setSaving(true);
      await updateProject(Number(id), formData);
      alert("Project updated successfully!");
      navigate("/projects");
    } catch (err: any) {
      setError(err.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading project...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg transition-colors duration-300">
      <h3 className="text-3xl font-extrabold mb-6 text-gray-800 dark:text-gray-100 text-center">
        Edit Project
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Title
          </label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
          />
        </div>

        {/* Video Link */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
            Video Link
          </label>
          <input
            name="videoLink"
            value={formData.videoLink}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
          />
        </div>

        {/* Tech Stacks */}
        <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg bg-gray-100 dark:bg-gray-800 transition-colors">
          <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
            Tech Stacks
          </label>
          {formData.techStacks.map((stack, index) => (
            <div
              key={stack.id || index}
              className="mb-4 p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 transition"
            >
              <input
                type="text"
                value={stack.name}
                onChange={(e) => {
                  const newStacks = [...formData.techStacks];
                  newStacks[index].name = e.target.value;
                  setFormData({ ...formData, techStacks: newStacks });
                }}
                className="w-full mb-3 border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
                placeholder="Stack name"
              />
              <textarea
                value={stack.description}
                onChange={(e) => {
                  const newStacks = [...formData.techStacks];
                  newStacks[index].description = e.target.value;
                  setFormData({ ...formData, techStacks: newStacks });
                }}
                className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 h-20 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
                placeholder="Description"
              />
              <button
                type="button"
                onClick={() => {
                  const updatedStacks = formData.techStacks.filter(
                    (_, i) => i !== index
                  );
                  setFormData({ ...formData, techStacks: updatedStacks });
                }}
                className="mt-2 text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={saving}
          className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-green-500 dark:hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-colors"
        >
          {saving ? "Updating..." : "Update Project"}
        </button>
      </form>
    </div>
  );
}
