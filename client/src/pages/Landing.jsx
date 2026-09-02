import React, { useState } from "react";
import LandingNav from "../components/LandingNav";
import HeroSection from "./LandingSubPages/HeroSection";
import PlatformSection from "./LandingSubPages/PlatformSection";


const ITEM_WIDTH = 168;
const GAP = 8;

const Landing = () => {
  const [index, setIndex] = useState(0);
  const [distance, setDistance] = useState(2);

  const barClick = (idx) => {
    setIndex(idx);
    setDistance(2 + idx * (ITEM_WIDTH + GAP));
  };

  return (
    <>
      <LandingNav />
      <HeroSection />
      <PlatformSection index={index} distance={distance} barClick={barClick} />
    </>
  );
};

export default Landing;
