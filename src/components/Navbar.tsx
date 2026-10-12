
import React from "react";
import Image from "next/image";
import logo from "@/assets/logo-icon.png";
import Navlinks from "@/components/Navlinks";
import Marquee from "@/components/marquee";
import AccountMenu from "@/components/AccountMenu";
import "@/app/globals.css";

const Navbar = () => {
  const date = new Date().toLocaleDateString("bn-BD", { dateStyle: "full" });

  return (
    <header className="w-full bg-gray-200 px-3 sm:px-5">
      <div className="navbar flex min-h-0 flex-wrap items-center justify-between gap-3 rounded-lg p-3 shadow-sm sm:p-5">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Image
            src={logo}
            alt="বাজার দর লোগো"
            width={40}
            height={40}
            className="h-9 w-9 shrink-0 rounded-xl bg-amber-300 p-2 object-contain sm:h-10 sm:w-10"
          />
          <div className="min-w-0">
            <h2 className="truncate text-lg font-bold text-blue-950 sm:text-xl">
              বাজার দর
            </h2>
            <p className="text-xs text-gray-600 sm:text-sm">{date}</p>
          </div>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-3">
          <div className="dropdown dropdown-end">
            <button
              aria-label="কার্ট"
              className="btn btn-ghost btn-circle btn-sm sm:btn-md"
              type="button"
            >
              <span className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-xs indicator-item sm:badge-sm">
                  8
                </span>
              </span>
            </button>
            <div className="card card-sm dropdown-content z-20 mt-3 w-52 max-w-[calc(100vw-1.5rem)] bg-base-100 shadow">
              <div className="card-body">
                <span className="text-lg font-bold">8 Items</span>
                <span className="text-info">Subtotal: $999</span>
                <div className="card-actions">
                  <button className="btn btn-primary btn-block" type="button">
                    View cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          <AccountMenu />
        </div>
      </div>

      <div className="mx-auto max-w-7xl">
        <Navlinks />
      </div>

      <div className="w-full overflow-hidden">
        <Marquee />
      </div>
    </header>
  );
};

export default Navbar;
