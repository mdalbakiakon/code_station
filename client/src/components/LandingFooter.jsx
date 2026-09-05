import React from "react";

const LandingFooter = () => {
  return (
    <div className="mt-47 p-2.5">
      <div className="[clip-path:inset(0_round_50px)] w-full min-h-87.5 relative overflow-hidden flex justify-center items-center">
        <div className="absolute inset-0">
            <img src="/footer.jpg" alt="" className="w-full h-full object-cover object-center opacity-75"/>
        </div>

        <div className="absolute inset-0 z-10 bg-[linear-gradient(to_bottom,transparent_0%,black_110%)] p-7.5">
          <span className="text-(--land-txt-main) font-ex text-2xl leading-none tracking-tighter">CodeStation</span>
        </div>
      </div>
    </div>
  );
};

export default LandingFooter;
