import { Scissors, Sparkles } from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveObject = () => {
  const [input, setInput] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [object, setObject] = useState("");

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
    const objectName = object.trim();

    if (!input) {
      toast.error("Please select an image first.");
      return;
    }

    if (!objectName) {
      toast.error("Please enter the name of the object to remove.");
      return;
    }

    try {
      setLoading(true);
      setContent("");

      const formData = new FormData();
      formData.append("image", input);
      formData.append("object", objectName);
      const token = await getToken();

      const { data } = await axios.post(
        "/api/ai/remove-image-object",
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
        toast.error(data.message || "Unable to remove the object.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Unable to remove the object.",
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
          <h1 className="text-xl font-semibold">Object Removal</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Upload Image</p>

        <input
          onChange={handleFileChange}
          type="file"
          accept="image/*"
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600"
          required
        />

        <p className="mt-6 text-sm font-medium">
          Describe object name to remove
        </p>

        <textarea
          onChange={(e) => setObject(e.target.value)}
          value={object}
          rows={4}
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
          placeholder="e.g., watch or spoon , Only single object name"
          required
        />

        <button
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-linear-to-r from-[#F04A3C] to-[#F76C1C] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
        >
          {loading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
          ) : (
            <Scissors className="w-5" />
          )}
          Remove Object
        </button>
      </form>
      {/* right col */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96">
        <div className="flex items-center gap-3">
          <Scissors className="w-5 h-5 text-[#F04A3C]" />
          <h1 className="text-xl font-semibold">Processed Image</h1>
        </div>

        {!content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-500">
              <Scissors className="w-10 h-10 text-[#F04A3C]" />
              <p>
                Upload an image and click "Remove Object" to remove the object
              </p>
            </div>
          </div>
        ) : (
          <img
            src={content}
            alt={`Image with ${object.trim()} removed`}
            className="mt-3 w-full h-full rounded-lg object-contain"
          />
        )}
      </div>
    </div>
  );
};

export default RemoveObject;
