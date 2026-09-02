import React, { useState, useEffect } from "react";
import LandingNav from "../components/LandingNav";
import backgroundAssets from "../assets/landingAssets";

// Initial list of skills to be displayed in the rotating carousel.
// The order here determines which skill starts centered (see MIDDLE_INDEX).
const initialSkills = [
  "Frontend Engineering",
  "Backend Engineering",
  "UI/UX Design",
  "Full Stack Development",
  "Graphic Design",
  "System Design",
  "DevOps",
];

// Vertical spacing (in px) between each skill item in the carousel.
const ITEM_HEIGHT = 30;

// Index of the item that should always appear centered/highlighted.
const MIDDLE_INDEX = 3;

/**
 * Computes the inline style for a skill item based on its distance
 * from the centered (highlighted) item. Items closer to the center
 * are larger, bolder, and more opaque; items farther away fade out.
 */
function getItemStyle(index) {
  // How many positions away this item is from the centered item.
  const distance = Math.abs(index - MIDDLE_INDEX);

  // Vertical pixel offset used to stack items above/below the center.
  const offset = (index - MIDDLE_INDEX) * ITEM_HEIGHT;

  // Default styling for items far from the center (mostly faded out).
  let opacity = 0.05;
  let fontSize = "0.85rem";
  let fontWeight = "normal";
  let color = "#f5f5f5";

  // The centered item: fully visible, larger, bold, and accent-colored.
  if (distance === 0) {
    opacity = 1;
    color = "#9b5a50";
    fontSize = "1.5rem";
    fontWeight = "bold";
  } else if (distance === 1) {
    // Items immediately adjacent to the center are partially visible.
    opacity = 0.25;
  } else if (distance === 2) {
    // Items two positions away are even more faded.
    opacity = 0.15;
  }

  return {
    top: "49%",
    // Combine the vertical offset with a base centering transform.
    transform: `translateY(${offset}px) translateY(-50%)`,
    opacity,
    color,
    fontSize,
    fontWeight,
    lineHeight: 0,
  };
}

const VIDEO_EXTENSIONS = ["mp4", "webm", "mov", "ogg"];

function isVideoFile(src) {
  const ext = src.split(".").pop().toLowerCase();
  return VIDEO_EXTENSIONS.includes(ext);
}

const Landing = () => {
  // Holds the current ordering of skills; rotated periodically to
  // create the auto-scrolling carousel effect.
  const [skills, setSkills] = useState(initialSkills);
  const [index, setIndex] = useState(0);
  const [distance, setDistance] = useState(2);

  const ITEM_WIDTH = 168;
  const GAP = 8;

  const barClick = (idx) => {
    setIndex(idx);
    setDistance(2 + idx * (ITEM_WIDTH + GAP));
  };

  // Sets up an interval that cycles the skills array every 3 seconds,
  // moving the first item to the end of the list (carousel rotation).
  useEffect(() => {
    const interval = setInterval(() => {
      setSkills((prevSkills) => {
        const first = prevSkills[0];
        const rest = prevSkills.slice(1);
        return [...rest, first];
      });
    }, 3000);

    // Clean up the interval when the component unmounts.
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <LandingNav />
      <section className="relative flex flex-col justify-center items-center font-ex p-2.5 md:p-5 h-svh">
        {/* landing hero image */}
        <img
          src="./hero.webp"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          alt="code-station-landing-page"
          className="w-full h-svh object-cover object-center absolute top-0 left-0 z-0 select-none"
        />

        {/* improve ux by adding a transparent div so no one can select and drag hero image */}
        <div className="w-full h-svh bg-transparent absolute top-0 left-0 z-10"></div>

        <div className="w-full max-w-5xl mx-auto relative z-20 flex flex-col md:flex-row justify-between mb-5 md:justify-between items-center gap-2.5 md:gap-5 h-full text-[#f5f5f5]">
          <div className="md:flex-1 select-none flex flex-col justify-start md:justify-between items-start gap-5 md:gap-15">
            {/* landing hero text */}
            <div>
              {/* headings */}
              <h1 className="text-3xl md:text-6xl leading-none tracking-tighter font-ex">
                One Station
                <br />
                to direct your career.
              </h1>

              {/* subheadings */}
              <p className="font-lt text-base md:text-2xl tracking-tighter leading-none mt-2.5 md:mt-7.5 text-[#d3d3d3]">
                Skip the trials and errors. Learn directly from professionals
                who've built the career you've dreamt about.
              </p>
            </div>

            {/* call-to-action buttons */}
            <div className="flex justify-center items-center font-rg gap-2 md:gap-3.5">
              <button className="bg-[#f5f5f5] text-[#111] px-5 py-1.5 rounded-lg cursor-pointer text-sm md:text-lg border border-[#f5f5f5]">
                Explore
              </button>
              <button className="px-5 py-1.5 rounded-lg cursor-pointer text-sm md:text-lg border border-[#f5f5f5] hover:bg-white/5">
                Why us?
              </button>
            </div>
          </div>

          {/* rotating skills carousel */}
          <div className="w-full md:w-2/5 h-fit rounded-4xl relative p-0.5 overflow-hidden">
            <div className="relative w-full p-0.5 select-none h-45 md:h-52.5">
              {/* render each skill with its computed position/opacity style */}
              {skills.map((skill, index) => (
                <p
                  key={skill}
                  className="absolute right-5 w-full text-right whitespace-nowrap transition-all duration-600 ease-out scale-75 md:scale-100 origin-right"
                  style={getItemStyle(index)}
                >
                  {skill}
                </p>
              ))}

              {/* pointer/arrow indicator marking the centered skill */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 scale-75 md:scale-100">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  style={{ transform: "scaleX(-1)" }}
                >
                  <polygon points="4,2 22,12 4,22" fill="#9b5a50"></polygon>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* trust/social-proof strip pinned to the bottom of the hero section */}
        <div className="absolute left-1/2 -translate-x-1/2  bottom-2.5 md:bottom-5 font-ex text-[8px] md:text-sm z-20 text-[#707070] text-center w-full select-none">
          Trusted by 100K+ learners, professionals, and enterprises alike
        </div>
      </section>

      {/* second section: platform highlight with heading and background video */}
      <section className="p-2.5 md:p-5 w-full max-w-6xl mx-auto">
        <div className="mt-12.5 md:mt-25">
          {/* section heading */}
          <h2 className="font-ex text-4xl font-black text-[#f5f5f5] tracking-tighter leading-none text-center">
            Zero <span className="text-[#707070]">Hesitation</span> Hero Skills
          </h2>
          {/* section tagline */}
          <p className="text-center text-xl font-ex text-[#f5f5f5]/30 my-2.5 tracking-tighter leading-none">
            One platform to learn anything
          </p>
        </div>

        <ul className="my-12.5 w-fit h-12 rounded-full flex justify-center items-center mx-auto bg-white flex-nowrap p-0.5 gap-2 relative">
          <span
            id="bar"
            className="h-11 w-42 rounded-full bg-black absolute top-0.5 transition-all duration-700 ease-out"
            style={{ left: distance }}
          ></span>
          <li
            onClick={() => barClick(0)}
            className="font-rg text-sm leading-none tracking-tight h-full w-42 text-center shrink-0 flex justify-center items-center cursor-pointer text-white mix-blend-difference rounded-full"
          >
            Full Stack Development
          </li>
          <li
            onClick={() => barClick(1)}
            className="font-rg text-sm leading-none tracking-tight h-full w-42 text-center shrink-0 flex justify-center items-center cursor-pointer text-white mix-blend-difference rounded-full"
          >
            Frontend Enginnering
          </li>
          <li
            onClick={() => barClick(2)}
            className="font-rg text-sm leading-none tracking-tight h-full w-42 text-center shrink-0 flex justify-center items-center cursor-pointer text-white mix-blend-difference rounded-full"
          >
            Backend Engineering
          </li>
          <li
            onClick={() => barClick(3)}
            className="font-rg text-sm leading-none tracking-tight h-full w-42 text-center shrink-0 flex justify-center items-center cursor-pointer text-white mix-blend-difference rounded-full"
          >
            Product Design
          </li>
          <li
            onClick={() => barClick(4)}
            className="font-rg text-sm leading-none tracking-tight h-full w-42 text-center shrink-0 flex justify-center items-center cursor-pointer text-white mix-blend-difference rounded-full"
          >
            More
          </li>
        </ul>

        {/* background video/image with color-tint overlay and gradient fade */}
        <div className="relative w-full aspect-4/5 min-[481px]:aspect-video rounded-[50px] overflow-hidden">
          {isVideoFile(backgroundAssets[index].src) ? (
            <video
              key={backgroundAssets[index].src}
              src={backgroundAssets[index].src}
              autoPlay
              playsInline
              loop
              muted
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          ) : (
            <img
              key={backgroundAssets[index].src}
              src={backgroundAssets[index].src}
              alt=""
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
          )}

          {/* left-to-right black gradient to improve text legibility over video */}
          <div className="w-full h-full bg-[linear-gradient(to_right,black_0%,transparent_100%)] relative">
            <div className="absolute w-1/3 inset-10 font-ex text-[#f5f5f5] flex flex-col gap-7.5">
              <div>
                <h2 className="text-3xl tracking-tighter leading-none">
                  {backgroundAssets[index].title}
                </h2>
                <p className="text-[#707070] text-base leading-none tracking-tighter mt-5">
                  {backgroundAssets[index].description}
                </p>
              </div>

              {/* progress bar */}
              <div className="w-full flex-1 relative">
                <div className="absolute left-0 bottom-0 flex gap-1.5">
                  <span
                    className={`w-8 h-1 transition-all duration-700 ease-out rounded-full bg-[#707070]/30 ${index === 0 ? "bg-[#f5f5f5] w-12.5" : ""}`}
                  ></span>
                  <span
                    className={`w-8 h-1 transition-all duration-700 ease-out rounded-full bg-[#707070]/30 ${index === 1 ? "bg-[#f5f5f5] w-12.5" : ""}`}
                  ></span>
                  <span
                    className={`w-8 h-1 transition-all duration-700 ease-out rounded-full bg-[#707070]/30 ${index === 2 ? "bg-[#f5f5f5] w-12.5" : ""}`}
                  ></span>
                  <span
                    className={`w-8 h-1 transition-all duration-700 ease-out rounded-full bg-[#707070]/30 ${index === 3 ? "bg-[#f5f5f5] w-12.5" : ""}`}
                  ></span>
                  <span
                    className={`w-8 h-1 transition-all duration-700 ease-out rounded-full bg-[#707070]/30 ${index === 4 ? "bg-[#f5f5f5] w-12.5" : ""}`}
                  ></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Landing;
