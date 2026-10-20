import React, { useState } from "react";
import { Hash, Sparkles } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/react";
import Markdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const BlogTitles = () => {
  const blogCategories = [
    "General",
    "Technology",
    "Business",
    "Health",
    "Lifestyle",
    "Education",
    "Travel",
    "Food",
  ];

  const [selectedCategory, setSelectedCategory] = useState("General");
  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setContent("");
      const keyword = input.trim();
      const prompt = `Create 5 distinct, polished blog title options about "${keyword}" for the ${selectedCategory} category. Use varied approaches (for example: how-to, benefit-led, curiosity-led, data-led, and authoritative) where appropriate. Format each as a numbered Markdown list item with the title in bold, followed by one concise sentence explaining its angle and intended reader appeal. Avoid generic clickbait, repeated wording, and unsupported claims. Return only the list.`;
      const token = await getToken();

      const { data } = await axios.post(
        "/api/ai/generate-blog-title",
        { prompt },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (data.success) {
        if (!data.content?.trim()) {
          throw new Error("The AI did not return any blog titles. Please try again.");
        }
        setContent(data.content.trim());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Unable to generate blog titles. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      {/* left col */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#F04A3C]" />
          <h1 className="text-xl font-semibold">AI Title Generator</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Keyword</p>

        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
          placeholder="The Future of AI is..."
          required
        />

        <p className="mt-4 text-sm font-medium">Category</p>

        <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/11">
          {blogCategories.map((item) => (
            <button
              type="button"
              onClick={() => setSelectedCategory(item)}
              aria-pressed={selectedCategory === item}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${selectedCategory === item ? "bg-orange-50 text-orange-700 border-orange-200" : "text-gray-500 border-gray-300"} `}
              key={item}
            >
              {item}
            </button>
          ))}
        </div>
        <br />
        <button
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-linear-to-r from-[#F04A3C] to-[#F76C1C] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
        >
          {loading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
          ) : (
            <Hash className="w-5" />
          )}
          Generate Title
        </button>
      </form>
      {/* right col */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96">
        <div className="flex items-center gap-3">
          <Hash className="w-5 h-5 text-[#F04A3C]" />
          <h1 className="text-xl font-semibold">Generate Titles</h1>
        </div>
        {!content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <Hash className="w-9 h-9" />
              <p>Enter a Topic and click "Generate Title" to get started.</p>
            </div>
          </div>
        ) : (
          <div className="mt-3 h-full overflow-y-scroll text-sm leading-6 text-slate-600">
            <Markdown
              components={{
                ol: ({ ...props }) => (
                  <ol className="list-decimal space-y-4 pl-6" {...props} />
                ),
                ul: ({ ...props }) => (
                  <ul className="list-disc space-y-3 pl-6" {...props} />
                ),
                li: ({ ...props }) => <li className="pl-1" {...props} />,
                p: ({ ...props }) => <p className="mb-1" {...props} />,
                strong: ({ ...props }) => (
                  <strong className="font-semibold text-slate-800" {...props} />
                ),
              }}
            >
              {content}
            </Markdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogTitles;
