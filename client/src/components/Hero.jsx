import React from "react";
import { ArrowRightIcon } from "lucide-react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden bg-cover bg-no-repeat px-4 sm:px-20 xl:px-32"
      style={{ backgroundImage: `url(${assets.gradientBackground})` }}
    >
      <div className="relative z-10 mb-8 text-center">
        <span className="inline-flex items-center rounded-full border border-slate-300/80 bg-white/80 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.22em] text-slate-700 backdrop-blur-sm sm:text-[11px]">
          AI productivity platform
        </span>

        <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-black leading-[1.05] tracking-[-0.04em] text-slate-900 sm:text-5xl md:text-6xl 2xl:text-7xl">
          Turn ideas into polished,
          <span className="mt-2 block bg-linear-to-r from-sky-700 via-slate-900 to-slate-700 bg-clip-text text-transparent">
            high-impact content.
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-sm text-slate-700 sm:text-base lg:text-lg">
          Empower your workflow with intelligent AI tools designed to generate,
          refine, and scale content that looks premium and performs beautifully.
        </p>
      </div>

      <div className="relative z-10 flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs">
        <button
          onClick={() => navigate("/ai")}
          className="rounded-full bg-primary px-8 py-3 font-semibold text-white shadow-lg shadow-cyan-500/30 transition hover:scale-[1.02] active:scale-95"
        >
          Start creating now
        </button>
        <button className="rounded-full border border-slate-300 bg-white/80 px-8 py-3 font-semibold text-slate-800 backdrop-blur-sm transition hover:bg-white active:scale-95">
          Watch demo
        </button>
      </div>

      <div className="flex items-center gap-4 mt-8 mx-auto text-gray-600">
        <img src={assets.user_group} alt="" className="h-8" /> Trusted by 10K+
        people.
      </div>
    </div>
  );
};

export default Hero;
