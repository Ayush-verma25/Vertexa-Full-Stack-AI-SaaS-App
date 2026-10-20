import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/react";
import { Heart } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likingIds, setLikingIds] = useState([]);
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();

  useEffect(() => {
    let active = true;

    const fetchCreations = async () => {
      if (!isLoaded) return;
      if (!user) {
        setCreations([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const token = await getToken();
        const { data } = await axios.get("/api/user/get-published-creations", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!active) return;
        if (data.success) {
          setCreations(data.creations ?? []);
        } else {
          toast.error(data.message || "Unable to load community creations.");
        }
      } catch (error) {
        if (active) {
          toast.error(
            error.response?.data?.message ||
              error.message ||
              "Unable to load community creations.",
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    void fetchCreations();
    return () => {
      active = false;
    };
  }, [getToken, isLoaded, user]);

  const toggleLike = async (creation) => {
    if (!user || likingIds.includes(creation.id)) return;

    const previousLikes = creation.likes ?? [];
    const alreadyLiked = previousLikes.includes(user.id);
    const updatedLikes = alreadyLiked
      ? previousLikes.filter((userId) => userId !== user.id)
      : [...previousLikes, user.id];

    setLikingIds((ids) => [...ids, creation.id]);
    setCreations((items) =>
      items.map((item) =>
        item.id === creation.id ? { ...item, likes: updatedLikes } : item,
      ),
    );

    try {
      const token = await getToken();
      const { data } = await axios.post(
        "/api/user/toggle-like-creation",
        { id: creation.id },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (!data.success) {
        throw new Error(data.message || "Unable to update like.");
      }

      setCreations((items) =>
        items.map((item) =>
          item.id === creation.id && Array.isArray(data.likes)
            ? { ...item, likes: data.likes }
            : item,
        ),
      );
    } catch (error) {
      setCreations((items) =>
        items.map((item) =>
          item.id === creation.id ? { ...item, likes: previousLikes } : item,
        ),
      );
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Unable to update like.",
      );
    } finally {
      setLikingIds((ids) => ids.filter((id) => id !== creation.id));
    }
  };

  return !loading ? (
    <div className="flex h-full flex-1 flex-col gap-4 p-6">
      <h1 className="text-xl font-semibold text-slate-800">
        Community Creations
      </h1>
      <div className="h-full w-full overflow-y-auto rounded-xl bg-white">
        {loading ? (
          <p className="p-6 text-sm text-gray-500">Loading creations...</p>
        ) : creations.length === 0 ? (
          <p className="p-6 text-sm text-gray-500">
            No public creations are available yet.
          </p>
        ) : (
          creations.map((creation) => {
            const likes = creation.likes ?? [];
            const isLiked = user ? likes.includes(user.id) : false;

            return (
              <div
                className="relative group inline-block w-full pl-3 pt-3 sm:max-w-1/2 lg:max-w-1/3"
                key={creation.id}
              >
                <img
                  src={creation.content}
                  alt={creation.prompt || "Community creation"}
                  className="h-full w-full rounded-lg object-cover"
                />

                <div className="absolute bottom-0 left-3 right-0 top-3 flex items-end justify-end gap-2 rounded-lg p-3 text-white group-hover:justify-between group-hover:bg-linear-to-b group-hover:from-transparent group-hover:to-black/80">
                  <p className="hidden text-sm group-hover:block">
                    {creation.prompt}
                  </p>
                  <div className="flex items-center gap-1">
                    <span>{likes.length}</span>
                    <button
                      type="button"
                      onClick={() => toggleLike(creation)}
                      disabled={!user || likingIds.includes(creation.id)}
                      aria-label={isLiked ? "Unlike creation" : "Like creation"}
                      aria-pressed={isLiked}
                      className="rounded-full p-1 disabled:cursor-not-allowed"
                    >
                      <Heart
                        className={`h-5 min-w-5 transition hover:scale-110 ${
                          isLiked ? "fill-red-500 text-red-600" : "text-white"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-full">
      <span className="w-10 h-10 my-1 rounded-full border-3 border-primary border-t-transparent animate-spin"></span>
    </div>
  );
};

export default Community;
