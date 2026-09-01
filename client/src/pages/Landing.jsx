import React, { useState, useEffect } from "react";
import LandingNav from "../components/LandingNav";

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

const Landing = () => {
  // Holds the current ordering of skills; rotated periodically to
  // create the auto-scrolling carousel effect.
  const [skills, setSkills] = useState(initialSkills);

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
              <p className="font-lt text-base md:text-2xl tracking-tighter leading-none mt-2.5 md:mt-7.5 opacity-75">
                Skip the trials and errors. Learn directly from professionals
                who've built the career you've dreamt about.
              </p>
            </div>

            {/* call-to-action buttons */}
            <div className="flex justify-center items-center font-lt gap-2 md:gap-3.5">
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

        <div className="absolute left-1/2 -translate-x-1/2  bottom-2.5 md:bottom-5 font-lt text-[8px] md:text-sm z-20 text-[#f5f5f5] opacity-70 text-center w-full">
          Trusted by 100K+ learners, professionals, and enterprises alike
        </div>
      </section>

      <section></section>
      <section></section>
      <section></section>
    </>
  );
};

export default Landing;
