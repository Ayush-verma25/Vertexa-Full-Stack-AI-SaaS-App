import React from "react";
import { dummyCreationData } from "../assets/assets";
import { Gem, Sparkles } from "lucide-react";
import { Show } from "@clerk/react";
import CreationItem from "../components/CreationItem";

const Dashboard = () => {
  const creations = dummyCreationData;

  return (
    <div className="h-full overflow-y-scroll p-6">
      <div className="flex justify-start gap-4 flex-wrap">
        {/* Sample Creations Card */}
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200">
          <div className="text-slate-600">
            <p className="text-sm">Total Sample Creations</p>
            <h2 className="text-xl font-semibold">{creations.length}</h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-linear-to-br from-[#F76C1C] to-[#F04A3C] text-white flex justify-center items-center">
            <Sparkles className="w-5 text-white" />
          </div>
        </div>

        {/* Active Plan Card */}
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200">
          <div className="text-slate-600">
            <p className="text-sm">Active Plan</p>
            <h2 className="text-xl font-semibold">
              <Show when={(has) => has({ plan: "premium" })} fallback="Free">
                Premium
              </Show>
            </h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-linear-to-br from-[#F76C1C] to-[#F04A3C] text-white flex justify-center items-center">
            <Gem className="w-5 text-white" />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <p className="mt-6 mb-4">Sample Creations</p>
        {creations.map((item) => (
          <CreationItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
