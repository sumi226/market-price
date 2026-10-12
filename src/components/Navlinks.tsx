import React from "react";
import Link from "next/link";

type Category = {
  id?: string;
  slug?: string;
  nameBn: string;
  icon: string;
};

const Navlinks = async () => {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/bazardor/categories",
      { cache: "no-store" },
    );

    if (!res.ok) return null;

    const navs: Category[] = await res.json();

    if (!Array.isArray(navs) || navs.length === 0) return null;

    return (
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center">
        <div className="flex flex-wrap justify-center gap-3 bg-emerald-300 p-5 m-5 rounded-xl">
          {navs.map((item: Category, i: number) => (
            <Link
              key={item.id ?? item.slug ?? i}
              href="#"
              className="rounded-lg bg-red px-4 py-2 hover:bg-emerald-100"
            >
              {item.icon} {item.nameBn}
            </Link>
          ))}
        </div>
      </div>
    );
  } catch {
    return null;
  }
};

export default Navlinks;
