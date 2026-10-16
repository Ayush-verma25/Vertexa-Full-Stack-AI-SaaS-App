import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="mt-20 w-full px-6 pt-10 text-slate-600 md:px-16 lg:px-24 xl:px-32">
      <div className="flex w-full flex-col justify-between gap-10 border-b border-slate-200 pb-8 md:flex-row">
        <div className="md:max-w-96">
          <img
            src="/vertexa-logo.svg"
            alt="Vertexa Logo"
            className="w-32 cursor-pointer sm:w-44"
            onClick={() => navigate("/")}
          />
          <p className="mt-5 max-w-sm text-sm leading-6 text-slate-600">
            Create with confidence. Vertexa brings powerful AI tools together
            to help you turn ideas into thoughtful, polished content—faster.
          </p>
        </div>
        <div className="flex flex-1 flex-col items-start gap-10 sm:flex-row sm:gap-16 md:justify-end">
          <div className="shrink-0">
            <h2 className="mb-4 font-semibold text-slate-900">Company</h2>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>
                <a className="transition hover:text-slate-950" href="#">
                  Home
                </a>
              </li>
              <li>
                <a className="transition hover:text-slate-950" href="#">
                  About us
                </a>
              </li>
              <li>
                <a className="transition hover:text-slate-950" href="#">
                  Contact us
                </a>
              </li>
              <li>
                <a className="transition hover:text-slate-950" href="#">
                  Privacy policy
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full max-w-md">
            <h2 className="mb-2 font-semibold text-slate-900">
              Get the latest from Vertexa
            </h2>
            <div className="space-y-3 text-sm">
              <p className="leading-6 text-slate-600">
                Product updates, useful ideas, and resources—delivered
                occasionally to your inbox.
              </p>
              <div className="flex flex-col gap-2 pt-1 sm:flex-row">
                <input
                  className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
                  type="email"
                  placeholder="Your email address"
                  aria-label="Email address"
                />
                <button className="h-11 shrink-0 rounded-lg bg-primary px-5 font-semibold text-white transition hover:brightness-95 active:scale-[0.98]">
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="pb-5 pt-4 text-center text-xs text-slate-500 sm:text-sm">
        © 2026 Vertexa. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
