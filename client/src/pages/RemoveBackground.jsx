import { Eraser, Sparkles } from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "../lib/api";
import { useAuth } from "@clerk/react";
import toast from "react-hot-toast";

const RemoveBackground = () => {
  const [input, setInput] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  useEffect(() => {
    if (previewUrl) {
      return () => URL.revokeObjectURL(previewUrl);
    }
  }, [previewUrl]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] ?? null;

    setInput(file);
    setContent("");
    setPreviewUrl(file ? URL.createObjectURL(file) : "");
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!input) {
      toast.error("Please select an image first.");
      return;
    }

    try {
      setLoading(true);
      setContent("");

      const formData = new FormData();
      formData.append("image", input);
      const token = await getToken();

      const { data } = await axios.post(
        "/api/ai/remove-image-background",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (data.success) {
        if (!data.content) {
          throw new Error(
            "The image service returned no image. Please try again.",
          );
        }
        setContent(data.content);
      } else {
        toast.error(data.message || "Unable to generate image.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Unable to remove the image background.",
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
          <h1 className="text-xl font-semibold">Background Removal</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Upload Image</p>

        <input
          onChange={handleFileChange}
          type="file"
          accept="image/*"
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600"
          required
        />

        <p className="text-xs text-gray-500 font-light mt-1">
          Supports JPG, PNG, and other image formats.
        </p>

        <button
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-linear-to-r from-[#F04A3C] to-[#F76C1C] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
        >
          {loading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
          ) : (
            <Eraser className="w-5" />
          )}
          Remove Background
        </button>
      </form>
      {/* right col */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96">
        <div className="flex items-center gap-3">
          <Eraser className="w-5 h-5 text-[#F04A3C]" />
          <h1 className="text-xl font-semibold">Processed Image</h1>
        </div>

        {!content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <Eraser className="w-9 h-9" />
              <p>
                Upload an image and click "Remove Background" to get started.
              </p>
            </div>
          </div>
        ) : (
          <img src={content} alt="image" className="mt-3 w-full h-full" />
        )}
      </div>
    </div>
  );
};

export default RemoveBackground;
