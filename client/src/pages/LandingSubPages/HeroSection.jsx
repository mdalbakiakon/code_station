import React, { useState, useEffect } from "react";

const HeroSection = () => {

  return (
    <section className="relative flex flex-col justify-center items-center font-ex p-2.5 md:p-5 h-svh! mt-0!">
      <img
        src="./hero.png"
        loading="eager"
        fetchPriority="high"
        decoding="async"
        alt="code-station-landing-page"
        className="w-full h-svh object-cover object-center absolute top-0 left-0 z-0 select-none"
      />

      <div className="w-full h-svh bg-[linear-gradient(to_bottom,transparent_0%,black_100%)] absolute top-0 left-0 z-10"></div>

      <div className="w-full max-w-5xl mx-auto relative z-20 flex flex-col md:flex-row justify-center items-center gap-2.5 md:gap-5 h-full text-(--land-txt-main) text-center">
        <div className="md:flex-1 select-none flex flex-col justify-start md:justify-between items-start gap-5 md:gap-15">
          <div>
            <h1 className="text-3xl md:text-6xl leading-[0.7] tracking-tighter font-ex">
              <span className="mask-[linear-gradient(to_bottom,red,transparent)]">One Station</span>
              <br />
              to direct your career.
            </h1>
            <p className="font-lt text-base md:text-2xl tracking-tighter leading-none mt-2.5 md:mt-7.5 text-(--land-txt-sec)">
              Skip the trials and errors. Learn directly from professionals
              who've built the career you've dreamt about.
            </p>
          </div>

          <div className="w-full flex justify-center items-center font-rg gap-2 md:gap-3.5">
            <button className="px-5 py-1.5 rounded-lg cursor-pointer text-sm md:text-lg border  border-transparent relative overflow-hidden">
              <span className="absolute inset-0 bg-[conic-gradient(from_-90deg,#f48139,#e57549,#4b11cd,#f48139)] z-10 blur-xs scale-125"></span>
              <span className="relative z-20 text-(--land-txt-main)">Explore</span>
            </button>
            <button className="px-5 py-1.5 text-(--land-txt-main) rounded-lg cursor-pointer text-sm md:text-lg border border-transparent hover:bg-white/10 transition-all duration-500 ease-out">
              Why us?
            </button>
          </div>
        </div>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 bottom-2.5 md:bottom-5 font-ex text-[8px] md:text-sm z-20 text-(--land-txt-sec) text-center w-full select-none">
        Trusted by 100K+ learners, professionals, and enterprises alike
      </div>
    </section>
  );
};

export default HeroSection;
