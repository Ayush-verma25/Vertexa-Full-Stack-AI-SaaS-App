import React from "react";
import { PricingTable } from "@clerk/react";

const Plan = () => {
  return (
    <div className="z-20 mx-auto my-30 max-w-3xl px-4 sm:px-20 xl:px-32">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-[-0.03em] text-slate-900 sm:text-4xl lg:text-[42px]">
          Choose your Plan
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-slate-600 sm:text-base">
          Start for free and scale up as you grow. Find the perfect plan for
          your content creation needs.
        </p>
      </div>

      <div className="mt-14 max-sm:mx-2">
        <PricingTable />
      </div>
    </div>
  );
};

export default Plan;
