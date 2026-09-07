import React from "react";

const Signup = () => {
  return (
    <div className="w-full h-svh bg-(--landing-bg-main) flex justify-center items-center gap-1 p-1">
      <div className="flex-1 h-full [clip-path:inset(0_round_50px)] relative">
        <img
          src="/signup.webp"
          alt="code-station-signup"
          fetchPriority="high"
          loading="eager"
          className="w-full h-full object-center object-cover select-none"
        />

        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,black_120%)] font-ex text-2xl text-left leading-none tracking-tighter text-(--land-txt-main) p-7.5 z-10">
          <div className="relative h-full w-full">
            <div className="absolute bottom-0 left-0 flex flex-col justify-center items-start">
              <h2>To Bright Future</h2>
              <p className="text-sm text-(--land-txt-sub)/50 tracking-tight">
                Just a step away from architecturing your destiny
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* signning up form */}
      <div className="flex-1 h-full">

      </div>
    </div>
  );
};

export default Signup;
