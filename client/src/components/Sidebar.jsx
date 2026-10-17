import React from "react";
import { useClerk, useUser, Show } from "@clerk/react";
import {
  Eraser,
  FileText,
  Hash,
  House,
  Image,
  LogOut,
  Scissors,
  SquarePen,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/ai", label: "Dashboard", icon: House },
  { to: "/ai/write-article", label: "Write Article", icon: SquarePen },
  { to: "/ai/blog-titles", label: "Blog Titles", icon: Hash },
  { to: "/ai/generate-images", label: "Generate Images", icon: Image },
  { to: "/ai/remove-background", label: "Remove Background", icon: Eraser },
  { to: "/ai/remove-object", label: "Remove Object", icon: Scissors },
  { to: "/ai/review-resume", label: "Review Resume", icon: FileText },
  { to: "/ai/community", label: "Community", icon: Users },
];

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user, isLoaded } = useUser();
  const { signOut, openUserProfile } = useClerk();

  return (
    <div
      className={`w-60 bg-white border-r border-gray-200 flex flex-col justify-between items-center max-sm:absolute max-sm:right-0 top-14 bottom-0 ${sidebar ? "translate-x-0" : "max-sm:translate-x-full"} transition-all duration-300 ease-in-out`}
    >
      <div className="my-7 w-full">
        {isLoaded && user && (
          <div className="mb-6">
            <img
              src={user.imageUrl}
              alt={user.fullName ? `${user.fullName}'s avatar` : "User avatar"}
              className="w-13 rounded-full mx-auto"
            />
            <h1 className="mt-1 text-center">
              {user.fullName || user.firstName || "User"}
            </h1>
          </div>
        )}
        <div className="px-6 mt-5 text-sm text-gray-600 font-medium">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/ai"}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `px-3.5 py-2.5 flex items-center gap-3 rounded ${isActive ? "bg-linear-to-r from-[#F76C1C] to-[#F04A3C] text-white" : ""}`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : ""}`} />
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      {isLoaded && user && (
        <div className="w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between">
          <button
            type="button"
            onClick={() => openUserProfile()}
            className="flex gap-2 items-center cursor-pointer text-left"
          >
            <img
              src={user.imageUrl}
              alt={user.fullName ? `${user.fullName}'s avatar` : "User avatar"}
              className="w-8 rounded-full"
            />
            <div>
              <h1 className="text-sm font-medium">
                {user.fullName || user.firstName || "User"}
              </h1>
              <p className="text-xs text-gray-500">
                <Show when={(has) => has({ plan: "premium" })} fallback="Free">
                  Premium
                </Show>{" "}
                Plan
              </p>
            </div>
          </button>
          <button
            type="button"
            onClick={() => signOut()}
            aria-label="Sign out"
            className="text-gray-400 transition hover:text-gray-700"
          >
            <LogOut className="w-4.5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
