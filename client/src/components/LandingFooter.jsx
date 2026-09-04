import React from "react";

const LandingFooter = () => {
  return (
    <div className="mt-47 p-2.5">
      <div className="rounded-[50px] w-full h-87.5 relative overflow-hidden flex justify-center items-center">
        <div className="absolute inset-0">
            <img src="/footer.jpg" alt="" className="w-full h-full object-cover object-center opacity-65"/>
        </div>

        <button className="px-5 py-1.5 rounded-lg cursor-pointer text-sm md:text-lg border border-transparent relative overflow-hidden">
          <span className="absolute inset-0 bg-[conic-gradient(from_-90deg,#f48139,#e57549,#4b11cd,#f48139)] z-10 blur-xs scale-125"></span>
          <span className="relative font-rg text-base md:text-xl leading-7 tracking-normal text-(--land-txt-main) z-20">
            Be a Stationer
          </span>
        </button>
      </div>
    </div>
  );
};

export default LandingFooter;
