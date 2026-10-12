import React from 'react';
import Image from 'next/image' ;
import Banner from "@/assets/bazar-hero.png";

const Hero = () => {
    const date = new Date().toLocaleDateString("bn-BD", {
      dateStyle: "full",
    });
    return (

    <section className="container mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-12">
      <div className="grid grid-cols-1 items-center gap-8 overflow-hidden rounded-2xl bg-white shadow-xl md:grid-cols-2 md:gap-6">
        {/* Left Side: Content */}
        <div className="p-5 sm:p-8 lg:p-12">
          {/* Eyebrow / Small Text */}
          <p className="mb-4 inline-block rounded-full bg-cyan-100 px-4 py-2 text-sm font-medium text-cyan-800">
            {date}
          </p>

          {/* Main Heading */}
          <h1 className="mb-4 text-2xl font-bold leading-snug text-gray-900 sm:text-3xl lg:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          {/* Subtitle */}
          <p className="mb-6 text-sm leading-7 text-gray-600 sm:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
            বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
            দামের পরিবর্তন এক জায়গায়।
          </p>

          {/* Primary CTA: Same-page anchor */}
          <a
            href="#sob-ponno"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:text-base"
          >
            সব পণ্য দেখুন
            <span className="ml-2" aria-hidden="true">→</span>
          </a>
        </div>

        {/* Right Side: Hero Image */}
        <div className="flex items-center justify-center p-5 pt-0 sm:p-8 md:pt-8">
          <Image
            src={Banner}
            alt="আজকের বাজারের বিভিন্ন পণ্য"
            width={500}
            height={400}
            priority
            className="h-auto w-full max-w-sm rounded-xl object-contain md:max-w-md"
          />
        </div>
      </div>
    </section>
    );
};

export default Hero;


// এখন সব পণ্য দেখুন বাটনে click করলে একই পেজে সরাসরি সব পণ্যের section-এ scroll করবে, অন্য route-এ যাবে না।