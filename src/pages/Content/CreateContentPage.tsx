import { useState } from "react";
import type { CreateContentDto, ItemDto } from "../../dtos/content.dto";
import { createContent } from "../../services/contentService";


function CreateContentPage() {
    const [content, setContent] = useState<CreateContentDto>({
        name: "",
        items: [],
    });

    const [item, setItem] = useState<ItemDto>({
        header: "",
        textContent: "",
    });

    const handleAddItem = () => {
        if (!item.header.trim()) return;
        setContent((prev) => ({
            ...prev,
            items: [...prev.items, item],
        }));
        setItem({ header: "", textContent: "" });
    }

    const handleCreate = async () => {
        try {
            const result = await createContent(content);
            alert("Project Created Successfully!");
            console.log(result);
            setContent({ name: "", items: [] });
        } catch (error) {
            alert("failed to Create project.");
            console.error(error);
        }
    }

  return (
      <div className="p-6 max-w-xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Create Content</h2>

          <input className="border p-2 w-full mb-3"
              type="text"
              placeholder="Content Name"
              value={content.name}
              onChange={(e) =>
                  setContent({ ...content, name: e.target.value })}
          />

          <div className="border p-2 mb-2">
              <h3> Add Item for content</h3>
              <input className="border p-2 w-full mb-2"
                  type="text"
                  placeholder="item Header"
                  value={item.header}
                  onChange={(e) => setItem({ ...item, header: e.target.value })}
              />
              <textarea className="border p-2 w-full mb-2"
                  placeholder="item Text"
                  value={item.textContent}
                  onChange={(e) => setItem({ ...item, textContent: e.target.value })}
              />

              <button className="bg-blue-500 text-white px-3 py-1 rounded"
                  onClick={handleAddItem}>
                  add item
              </button>

              <ul className="mt-3">
                  {content.items.map((i, idx)=>(
                      <li key={idx} className="text-sm">
                          {i.header} - {i.header}
                      </li>
                  ))}
              </ul>

              <button className="bg-green-600 text-white px-4 py-2 rounded"
                  onClick={handleCreate}>
                    create Content
              </button>

          </div>
      </div>
  );
}

export default CreateContentPage;