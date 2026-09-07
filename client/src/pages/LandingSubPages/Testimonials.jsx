import React, { useState } from "react";
import testimonials from "../../assets/testimonials";

const Testimonials = () => {
  // this tells us which card is on top right now
  const [activeIndex, setActiveIndex] = useState(0);

  const totalCards = testimonials.length;

  // go to next card
  const handleNext = () => {
    if (activeIndex === totalCards - 1) {
      setActiveIndex(0);
    } else {
      setActiveIndex((prev) => prev + 1);
    }
  };

  return (
    <section className="p-2.5 md:p-5 w-full mb-47">
      <div className="mt-12.5 md:mt-25">
        <h2 className="font-ex text-3xl md:text-4xl font-black text-(--land-txt-main) tracking-tighter leading-none text-center">
          Hear <span className="text-(--land-txt-sec)">from</span> Our Graduates
        </h2>
        <p className="text-center text-base md:text-xl font-ex text-(--land-txt-main)/30 mt-2.5 tracking-tighter leading-none">
          Level up your skills that the industry seeks
        </p>
      </div>

      {/* graduates card section */}
      <div className="relative flex justify-center items-center mt-12.5 select-none overflow-hidden">
        <div className="w-85 aspect-1.5/2 invisible"></div>

        {testimonials.map((elem, index) => {
          let distanceFromTop = index - activeIndex;

          if (distanceFromTop < 0) {
            distanceFromTop = distanceFromTop + totalCards;
          }

          if (distanceFromTop > 1) {
            return null;
          }

          let cardStyle = {};

          if (distanceFromTop === 0) {
            cardStyle = { transform: "translateY(0px) scale(1)", zIndex: 30 };
          } else {
            cardStyle = {
              transform: "translateY(14px) scale(0.95)",
              zIndex: 20,
            };
          }

          if (distanceFromTop !== 0) {
            cardStyle.pointerEvents = "none";
          }

          return (
            <div
              key={index}
              onClick={() => setActiveIndex(index)}
              style={cardStyle}
              className="w-85 aspect-1.5/2 shadow-2xl absolute cursor-pointer transition-all ease-out duration-500 overflow-hidden backdrop-blur-sm select-none"
            >
              <div className="w-full h-full bg-[linear-gradient(to_bottom,transparent_0%,black_90%)] relative z-40">
                <div className="absolute text-center bottom-0 left-1/2 -translate-1/2 text-2xl font-ex text-(--land-txt-main) leading-none tracking-tighter flex flex-col gap-0.5 select-none overflow-hidden">
                  <span>{elem.name}</span>
                  <span className="text-(--land-txt-sub)/50 text-sm tracking-tight">
                    {elem.role}
                  </span>
                </div>
              </div>
              <img
                src={elem.avatar}
                alt={elem.name}
                fetchPriority="low"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-center object-cover z-10"
              />
              <img
                src="/qoute.svg"
                alt=""
                className={`w-full absolute top-0 left-0 z-0 transition-opacity delay-200 duration-500 ease-in ${index === activeIndex ? "opacity-100" : "opacity-0"}`}
              />
            </div>
          );
        })}
      </div>

      {/* qoute */}
      <div className="w-full max-w-3xl mx-auto text-(--land-txt-sub)/40 font-rg text-xl text-center leading-none tracking-tighter h-15 flex justify-center items-center">
        "{testimonials[activeIndex].quote}"
      </div>

      <div className="flex justify-center items-end h-12.5">
        <button
          className="bg-(--land-txt-main) font-ex text-lg leading-none tracking-tighter flex justify-center items-center cursor-pointer p-1 rounded-sm"
          onClick={handleNext}
        >
          See Next..
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
