
import React from "react";
import Image from "next/image";
import logo from "@/assets/logo-icon.png";
import Navlinks from "@/components/Navlinks";
import Marquee from "@/components/marquee";
import "@/app/globals.css";

const Navbar = () => {
const date = new Date().toLocaleDateString("bn-BD", {
dateStyle: "full",
});

return (
  <div className=" bg-gray-200 px-5">
    <div className="navbar  p-5 shadow-sm rounded-lg">
      <div className="flex items-center gap-3">
        <Image
          src={logo}
          alt="বাজার দর লোগো"
          width={40}
          height={40}
          className="h-10 w-10 bg-amber-300 rounded-xl p-2 object-contain"
        />

        <div>
          <h2 className="text-xl font-bold text-blue-950">বাজার দর</h2>
          <p className="text-sm text-gray-600">{date}</p>
        </div>
      </div>

      {/* Right Side: Cart & Profile */}
      <div className="ml-auto flex items-center gap-3">
        {/* Cart */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
              <span className="badge badge-sm indicator-item">8</span>
            </div>
          </div>

          <div
            tabIndex={0}
            className="card card-sm dropdown-content bg-base-100 z-10 mt-3 w-52 shadow"
          >
            <div className="card-body">
              <span className="text-lg font-bold">8 Items</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div>
        </div>

        {/* Profile */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <Image
                src="/profile.webp"
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
            </div>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Profile</a>
            </li>
            <li>
              <a>Sign-In</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <Navlinks />
    <Marquee />
   
  </div>
);
};

export default Navbar;


