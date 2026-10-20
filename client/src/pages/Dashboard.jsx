import React, { useCallback, useEffect, useState } from "react";
import { Gem, Sparkles } from "lucide-react";
import { Show, useAuth, useUser } from "@clerk/react";
import CreationItem from "../components/CreationItem";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();
  const { isLoaded, user } = useUser();

  const getDashboardData = useCallback(async () => {
    if (!isLoaded) return;

    if (!user) {
      setCreations([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/user/get-user-creations", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setCreations(data.creations ?? []);
      } else {
        toast.error(data.message || "Unable to load your creations.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Unable to load your creations.",
      );
    } finally {
      setLoading(false);
    }
  }, [getToken, isLoaded, user]);

  useEffect(() => {
    void getDashboardData();
  }, [getDashboardData]);

  return (
    <div className="h-full overflow-y-scroll p-6">
      <div className="flex justify-start gap-4 flex-wrap">
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200">
          <div className="text-slate-600">
            <p className="text-sm">Total Creations</p>
            <h2 className="text-xl font-semibold">{creations.length}</h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-linear-to-br from-[#F76C1C] to-[#F04A3C] text-white flex justify-center items-center">
            <Sparkles className="w-5 text-white" />
          </div>
        </div>

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

      {loading ? (
        <div className="flex justify-center items-center h-3/4">
          <div className="animate-spin rounded-full h-11 w-11 border-3 border-orange-500 border-t-transparent"></div>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="mt-6 mb-4">Your Creations</p>
          {creations.length > 0 ? (
            creations.map((item) => <CreationItem key={item.id} item={item} />)
          ) : (
            <p className="text-sm text-gray-500">
              You haven’t created anything yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
