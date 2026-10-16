import React from "react";
import { AiToolsData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/react";

const AITools = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <div className="my-24 px-4 sm:px-20 xl:px-32">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-[-0.03em] text-slate-900 sm:text-4xl lg:text-[42px]">
          Powerful AI Tools
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-600 sm:text-base">
          Empower your workflow with intelligent AI tools designed to generate,
          refine, and scale content that looks premium and performs beautifully.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-6">
        {AiToolsData.map((tool, index) => (
          <div
            key={index}
            className="group m-2 w-full max-w-70 cursor-pointer rounded-2xl border border-slate-200 bg-white/90 p-7 shadow-[0_12px_35px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.12)]"
            onClick={() => user && navigate(tool.path)}
          >
            <tool.Icon
              className="h-12 w-12 rounded-xl p-3 text-white shadow-md"
              style={{
                background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})`,
              }}
            />
            <h3 className="mt-6 mb-3 text-lg font-semibold text-slate-900">
              {tool.title}
            </h3>
            <p className="max-w-[95%] text-sm leading-6 text-slate-600">
              {tool.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AITools;
