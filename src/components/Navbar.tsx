
import React from "react";
import Image from "next/image";
import logo from "@/assets/logo-icon.png";
import Navlinks from "@/components/Navlinks";
import Marquee from "@/components/marquee";
import AccountMenu from "@/components/AccountMenu";
import CartMenu from "@/components/CartMenu";
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
          <CartMenu />
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
