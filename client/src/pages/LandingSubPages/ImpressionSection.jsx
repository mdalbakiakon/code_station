import React from "react";
import { RiArrowRightSLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa6";
import { RiTwitterXLine } from "react-icons/ri";
import { FiGithub } from "react-icons/fi";
import { RiLinkedinLine } from "react-icons/ri";

const ImpressionSection = () => {
  return (
    <section className="relative">
      <h2 className="text-transparent absolute top-12.5 left-1/2 -translate-x-1/2 bg-clip-text font-ex leading-none text-[250px] w-full bg-[linear-gradient(to_bottom,#505050,transparent_95%)] text-center tracking-tighter">
        inspiration
      </h2>

      <div className="w-full h-fit flex justify-center items-center gap-1 p-2.5 my-47 relative z-20">
        
        <div className="flex-1 flex flex-col rounded-[50px] bg-(--land-txt-main) aspect-square p-7.5 gap-7.5 relative overflow-hidden">

          <div className="absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-end items-center gap-3.75 text-center">
                <p className="text-2xl font-lt leading-none tracking-tighter text-(--land-txt-sub)">
                  Coffee
                </p>
                <p className="text-2xl font-lt leading-none tracking-tighter text-(--land-txt-sub)">
                  Code
                </p>
                <p className="text-2xl font-lt leading-none tracking-tighter text-(--land-txt-sub)">
                  CodeStation
                </p>
                <p className="text-2xl font-lt leading-none tracking-tighter text-(--land-bg-main)">
                  Repeat
                </p>
              </div>

          <div className="h-fit w-12.5 flex flex-col justify-between items-center gap-1 absolute bottom-7.5 right-7.5 z-40">
            <div className="w-full aspect-square overflow-hidden rounded-xl flex justify-center items-center cursor-pointer border-2 border-(--land-txt-sec)/20 hover:border-(--land-txt-sec) group transition-all duration-500 ease-out">
              <FiGithub className="text-(--land-txt-sec)/50 flex justify-center items-center text-xl group-hover:text-(--land-txt-sec) transition-all duration-500 ease-out" />
            </div>

            <div className="w-full aspect-square overflow-hidden rounded-xl flex justify-center items-center cursor-pointer border-2 border-(--land-txt-sec)/20 hover:border-(--land-txt-sec) group transition-all duration-500 ease-out">
              <RiLinkedinLine className="text-(--land-txt-sec)/50 flex justify-center items-center text-xl group-hover:text-(--land-txt-sec) transition-all duration-500 ease-out" />
            </div>

            <div className="w-full aspect-square overflow-hidden rounded-xl flex justify-center items-center cursor-pointer border-2 border-(--land-txt-sec)/20 hover:border-(--land-txt-sec) group transition-all duration-500 ease-out">
              <FaInstagram className="text-(--land-txt-sec)/50 flex justify-center items-center text-xl group-hover:text-(--land-txt-sec) transition-all duration-500 ease-out" />
            </div>

            <div className="w-full aspect-square overflow-hidden rounded-xl rounded-br-[30px] flex justify-center items-center cursor-pointer border-2 border-(--land-txt-sec)/20 hover:border-(--land-txt-sec) group transition-all duration-500 ease-out">
              <RiTwitterXLine className="text-(--land-txt-sec)/50 flex justify-center items-center text-xl group-hover:text-(--land-txt-sec) transition-all duration-500 ease-out" />
            </div>
          </div>

          <div className="flex-1 grid grid-cols-1 grid-rows-3 grid-flow-col gap-2.5 relative z-30">
            <div className="flex flex-col justify-center items-center rounded-[50px] relative overflow-hidden p-7.5 gap-2.5 select-none">
              <h3 className="text-4xl font-lt leading-none tracking-tighter text-(--land-txt-sub)">
                Can't keep up?
              </h3>
              <h3 className="font-lt text-3xl text-center leading-none tracking-tighter text-(--land-txt-inverse)">
                You don't have to. Keep your own pace as long as it takes.
              </h3>
              <span className="h-0.75 w-5 rounded-full bg-(--land-txt-inverse) mt-5"></span>
            </div>

            <div className="row-span-2 relative">

              <div className="h-15 w-fit flex justify-between items-center text-(--land-txt-main) font-rg leading-0 tracking-tighter p-1 rounded-full bg-(--land-bg-main) absolute bottom-0 left-0">
                <span className="px-3.5 text-xl flex justify-center items-center text-center">
                  Take a look
                </span>
                <div className="h-full aspect-square overflow-hidden relative rounded-full flex justify-center items-center cursor-pointer">
                  <RiArrowRightSLine className="relative z-20 text-(--land-txt-main) flex justify-center items-center font-black text-4xl" />
                  <span className="absolute inset-0 w-full h-full bg-[conic-gradient(from_-90deg,#f48139,#e57549,#4b11cd,#f48139)] blur-xs scale-125 bg-center bg-cover"></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 rounded-[50px] bg-(--land-txt-main) aspect-square p-7.5 bg-[url('/FREE.png')] bg-cover bg-top relative">
          <h2 className="text-9xl text-right text-white mix-blend-difference font-ex leading-[0.75] tracking-tighter absolute right-7.5 bottom-12.5 left-15">
            "Rome wasn't built in a day"
          </h2>
        </div>
      </div>
    </section>
  );
};

export default ImpressionSection;
