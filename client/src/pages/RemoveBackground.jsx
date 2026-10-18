import { Eraser, Sparkles } from "lucide-react";
import React, { useEffect, useState } from "react";

const RemoveBackground = () => {
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    if (previewUrl) {
      return () => URL.revokeObjectURL(previewUrl);
    }
  }, [previewUrl]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] ?? null;

    setPreviewUrl(file ? URL.createObjectURL(file) : "");
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
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

        <button className="w-full flex justify-center items-center gap-2 bg-linear-to-r from-[#F04A3C] to-[#F76C1C] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer">
          <Eraser className="w-5" />
          Remove Background
        </button>
      </form>
      {/* right col */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96">
        <div className="flex items-center gap-3">
          <Eraser className="w-5 h-5 text-[#F04A3C]" />
          <h1 className="text-xl font-semibold">Image Preview</h1>
        </div>
        <div className="flex-1 flex justify-center items-center">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Selected image preview"
              className="max-h-80 max-w-full rounded-lg object-contain"
            />
          ) : (
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <Eraser className="w-9 h-9" />
              <p>Upload an image to preview it here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RemoveBackground;
