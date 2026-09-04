import React from "react";
import backgroundAssets from "../../assets/backgroundAssets";

const VIDEO_EXTENSIONS = ["mp4", "webm", "mov", "ogg"];

function isVideoFile(src) {
  const ext = src.split(".").pop().toLowerCase();
  return VIDEO_EXTENSIONS.includes(ext);
}

const tabs = [
  "Full Stack Development",
  "Frontend Enginnering",
  "Backend Engineering",
  "Product Design",
  "More",
];

const PlatformSection = ({ index, distance, barClick }) => {
  return (
    <section className="p-2.5 md:p-5 w-full max-w-6xl mx-auto mb-47">
      <div className="mt-12.5 md:mt-25">
        <h2 className="font-ex text-3xl md:text-4xl font-black text-(--land-txt-main) tracking-tighter leading-none text-center">
          Zero <span className="text-(--land-txt-sec)">Hesitation</span> Hero
          Skills
        </h2>
        <p className="text-center text-base md:text-xl font-ex text-(--land-txt-main)/30 mt-2.5 tracking-tighter leading-none">
          One platform to learn anything
        </p>
      </div>

      <ul className="hide-scrollbar my-12.5 overflow-x-scroll lg:overflow-hidden w-fit max-w-[85%] h-10 lg:h-12 rounded-full flex justify-start items-center mx-auto bg-(--land-txt-main) flex-nowrap p-0.5 gap-2 relative">
        <span
          id="bar"
          className="h-9 lg:h-11 w-42 rounded-full bg-(--land-bg-main) absolute top-0.5 transition-all duration-700 ease-out"
          style={{ left: distance }}
        ></span>
        {tabs.map((tab, i) => (
          <li
            key={tab}
            onClick={() => barClick(i)}
            className="font-rg text-sm leading-none tracking-tight h-full w-42 text-center shrink-0 flex justify-center items-center cursor-pointer text-white mix-blend-difference rounded-full"
          >
            {tab}
          </li>
        ))}
      </ul>

      <div className="relative w-full aspect-4/5 md:aspect-video [clip-path:inset(0_round_50px)]">
        {isVideoFile(backgroundAssets[index].src) ? (
          <video
            key={backgroundAssets[index].src}
            src={backgroundAssets[index].src}
            autoPlay
            playsInline
            loop
            muted
            className="absolute inset-0 w-full h-full object-cover object-center [clip-path:inset(0_round_50px)]"
          />
        ) : (
          <img
            key={backgroundAssets[index].src}
            src={backgroundAssets[index].src}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        )}

        <div className="hidden md:flex w-full h-full bg-[linear-gradient(to_right,var(--land-bg-main)_0%,transparent_100%)] relative">
          <div className="absolute w-2/3 md:w-1/3 inset-5 md:inset-10 font-ex text-(--land-txt-main) flex flex-col gap-7.5">
            <div className="">
              <h2 className="text-3xl tracking-tighter leading-none">
                {backgroundAssets[index].title}
              </h2>
              <p className="text-(--land-txt-sec) text-base leading-none tracking-tighter mt-5">
                {backgroundAssets[index].description}
              </p>
            </div>

            <div className="w-full flex-1 relative">
              <div className="absolute left-0 bottom-0 flex gap-1.5">
                {backgroundAssets.map((_, i) => (
                  <span
                    key={i}
                    className={`w-8 h-1 transition-all duration-700 ease-out rounded-full bg-(--land-txt-sec)/30 ${
                      index === i ? "bg-(--land-txt-main)! w-12.5" : ""
                    }`}
                  ></span>
                ))}
              </div>
            </div>
          </div>
        </div>





        <div className="md:hidden w-full h-full bg-[linear-gradient(to_right,var(--land-bg-main)_0%,transparent_100%)] relative">
          <div className="absolute w-[calc(100%-40px)] inset-5 md:inset-10 font-ex text-(--land-txt-main) flex flex-col gap-8">
            <div className="w-full flex-1 relative">
              <div className="absolute top-2.5 bottom-0 flex flex-col gap-1.25">
                {backgroundAssets.map((_, i) => (
                  <span
                    key={i}
                    className={`h-6 w-1 transition-all duration-700 ease-out rounded-full bg-(--land-txt-sec)/30 ${
                      index === i ? "bg-(--land-txt-main)! h-10.5" : ""
                    }`}
                  ></span>
                ))}
              </div>
            </div>

            <div className="w-2/3">
              <h2 className="text-2xl tracking-tighter leading-none">
                {backgroundAssets[index].title}
              </h2>
              <p className="text-(--land-txt-sec) text-[14px] leading-none tracking-tighter mt-2.5 line-clamp-2">
                {backgroundAssets[index].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformSection;
