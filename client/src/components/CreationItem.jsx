import React, { useState } from "react";
import Markdown from "react-markdown";

const CreationItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="p-4 max-w-5xl text-sm bg-white border border-gray-200 rounded-lg">
      <button
        type="button"
        onClick={() => setExpanded((previous) => !previous)}
        aria-label={`Toggle creation: ${item.prompt}`}
        aria-expanded={expanded}
        className="flex w-full justify-between items-center gap-4 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F76C1C]"
      >
        <span>
          <span className="block">{item.prompt}</span>
          <span className="block text-gray-500">
            {item.type} - {new Date(item.created_at).toLocaleDateString()}
          </span>
        </span>
        <span className="bg-[#EFF6FF] border border-[#F76C1C] text-[#F04A3C] px-4 py-1 rounded-full">
          {item.type}
        </span>
      </button>
      {expanded && (
        <div>
          {item.type === "image" ? (
            <div>
              <img
                src={item.content}
                alt="image"
                className="mt-3 w-full max-w-md"
              />
            </div>
          ) : (
            <div className="mt-3 h-full overflow-y-scroll text-sm text-slate-700">
              <div className="reset-tw">
                <Markdown>{item.content}</Markdown>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreationItem;
