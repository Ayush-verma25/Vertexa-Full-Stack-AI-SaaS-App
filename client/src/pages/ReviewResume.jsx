import React, { useState } from "react";
import { FileText, Sparkles } from "lucide-react";
import axios from "../lib/api";
import { useAuth } from "@clerk/react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

const ReviewResume = () => {
  const [input, setInput] = useState(null);

  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] ?? null;
    setInput(file);
    setContent("");
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!input) {
      toast.error("Please select a PDF resume first.");
      return;
    }

    if (input.size > 4 * 1024 * 1024) {
      toast.error("Resume file size exceeds the 4 MB limit.");
      return;
    }

    try {
      setLoading(true);
      setContent("");

      const formData = new FormData();
      formData.append("resume", input);
      const token = await getToken();

      const { data } = await axios.post("/api/ai/resume-review", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        if (!data.content) {
          throw new Error(
            "The resume review returned no feedback. Please try again.",
          );
        }
        setContent(data.content);
      } else {
        toast.error(data.message || "Unable to review this resume.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Unable to review this resume.",
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
          <h1 className="text-xl font-semibold">Resume Review</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Upload Resume</p>

        <input
          onChange={handleFileChange}
          type="file"
          accept="application/pdf"
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600"
          required
        />

        <p className="text-xs text-gray-500 font-light mt-1">
          Supports PDF resumes up to 4 MB.
        </p>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-linear-to-r from-[#F04A3C] to-[#F76C1C] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
          ) : (
            <FileText className="w-5" />
          )}
          Review Resume
        </button>
      </form>
      {/* right col */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-150">
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-[#F04A3C]" />
          <h1 className="text-xl font-semibold">Analyzed Resume</h1>
        </div>

        {!content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <FileText className="w-10 h-10 text-[#F04A3C]" />
              <p>Upload a PDF resume and click "Review Resume" to review it.</p>
            </div>
          </div>
        ) : (
          <div className="mt-3 h-full overflow-y-scroll text-sm leading-6 text-slate-600">
            <Markdown
              components={{
                h1: ({ ...props }) => (
                  <h1
                    className="mb-3 mt-5 text-xl font-semibold text-slate-800 first:mt-0"
                    {...props}
                  />
                ),
                h2: ({ ...props }) => (
                  <h2
                    className="mb-2 mt-5 text-lg font-semibold text-slate-800 first:mt-0"
                    {...props}
                  />
                ),
                h3: ({ ...props }) => (
                  <h3
                    className="mb-2 mt-4 text-base font-semibold text-slate-800"
                    {...props}
                  />
                ),
                p: ({ ...props }) => (
                  <p className="mb-3 last:mb-0" {...props} />
                ),
                ul: ({ ...props }) => (
                  <ul className="mb-4 list-disc space-y-1 pl-6" {...props} />
                ),
                ol: ({ ...props }) => (
                  <ol className="mb-4 list-decimal space-y-1 pl-6" {...props} />
                ),
                li: ({ ...props }) => <li className="pl-1" {...props} />,
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

export default ReviewResume;
