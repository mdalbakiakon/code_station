import React from "react";
import { LuCopyright } from "react-icons/lu";

const LandingFooter = () => {
  return (
    <footer className="mt-47 p-2.5">
      <div className="[clip-path:inset(0_round_50px)] w-full min-h-87.5 relative overflow-hidden flex justify-center items-center">
        <div className="absolute inset-0 z-10">
            <img src="/footer.jpg" alt="" className="w-full h-full object-cover object-center opacity-90"/>
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,black_110%)] p-7.5 z-20 flex flex-col gap-0.5">
          <span className="text-(--land-txt-main) font-ex text-2xl leading-none tracking-tighter">CodeStation</span>
          <span className="text-(--land-txt-sub)/50 font-ex text-xs leading-none">Learn by buildings, not by theories</span>
        </div>

        {/* copyright */}
        <div className="text-center font-ex absolute z-20 bottom-5 left-1/2 -translate-x-1/2 w-full flex justify-center text-sm items-center leading-0 tracking-tight text-(--land-txt-sub)/40 select-none">Copyright{" "}{new Date().getFullYear()}<LuCopyright className="mx-0.75"/>CodeStation. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default LandingFooter;
