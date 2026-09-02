import React, { useState, useEffect } from "react";

const initialSkills = [
  "Frontend Engineering",
  "Backend Engineering",
  "UI/UX Design",
  "Full Stack Development",
  "Graphic Design",
  "System Design",
  "DevOps",
];

const ITEM_HEIGHT = 30;
const MIDDLE_INDEX = 3;

function getItemStyle(index) {
  const distance = Math.abs(index - MIDDLE_INDEX);
  const offset = (index - MIDDLE_INDEX) * ITEM_HEIGHT;

  let opacity = 0.05;
  let fontSize = "0.85rem";
  let fontWeight = "normal";
  let color = "var(--land-txt-main)";

  if (distance === 0) {
    opacity = 1;
    color = "var(--land-accent)";
    fontSize = "1.5rem";
    fontWeight = "bold";
  } else if (distance === 1) {
    opacity = 0.25;
  } else if (distance === 2) {
    opacity = 0.15;
  }

  return {
    top: "49%",
    transform: `translateY(${offset}px) translateY(-50%)`,
    opacity,
    color,
    fontSize,
    fontWeight,
    lineHeight: 0,
  };
}

const HeroSection = () => {
  const [skills, setSkills] = useState(initialSkills);

  useEffect(() => {
    const interval = setInterval(() => {
      setSkills((prevSkills) => {
        const first = prevSkills[0];
        const rest = prevSkills.slice(1);
        return [...rest, first];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex flex-col justify-center items-center font-ex p-2.5 md:p-5 h-svh! mt-0!">
      <img
        src="./hero.webp"
        loading="eager"
        fetchPriority="high"
        decoding="async"
        alt="code-station-landing-page"
        className="w-full h-svh object-cover object-center absolute top-0 left-0 z-0 select-none"
      />

      <div className="w-full h-svh bg-transparent absolute top-0 left-0 z-10"></div>

      <div className="w-full max-w-5xl mx-auto relative z-20 flex flex-col md:flex-row justify-center mb-5 md:justify-between items-center gap-2.5 md:gap-5 h-full text-(--land-txt-main)">
        <div className="md:flex-1 select-none flex flex-col justify-start md:justify-between items-start gap-5 md:gap-15">
          <div>
            <h1 className="text-3xl md:text-6xl leading-none tracking-tighter font-ex">
              One Station
              <br />
              to direct your career.
            </h1>
            <p className="font-lt text-base md:text-2xl tracking-tighter leading-none mt-2.5 md:mt-7.5 text-(--land-txt-sub)">
              Skip the trials and errors. Learn directly from professionals
              who've built the career you've dreamt about.
            </p>
          </div>

          <div className="flex justify-center items-center font-rg gap-2 md:gap-3.5">
            <button className="bg-(--land-txt-main) text-(--land-txt-inverse) px-5 py-1.5 rounded-lg cursor-pointer text-sm md:text-lg border border-(--land-txt-main)">
              Explore
            </button>
            <button className="px-5 py-1.5 rounded-lg cursor-pointer text-sm md:text-lg border border-(--land-txt-main) hover:bg-white/5">
              Why us?
            </button>
          </div>
        </div>

        <div className="w-full md:w-2/5 h-fit rounded-4xl relative p-0.5 overflow-hidden">
          <div className="relative w-full p-0.5 select-none h-45 md:h-52.5">
            {skills.map((skill, i) => (
              <p
                key={skill}
                className="absolute right-5 w-full text-right whitespace-nowrap transition-all duration-600 ease-out scale-75 md:scale-100 origin-right"
                style={getItemStyle(i)}
              >
                {skill}
              </p>
            ))}

            <div className="absolute right-0 top-1/2 -translate-y-1/2 scale-75 md:scale-100">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                style={{ transform: "scaleX(-1)" }}
              >
                <polygon
                  points="4,2 22,12 4,22"
                  fill="var(--land-accent)"
                ></polygon>
              </svg>
            </div>
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
