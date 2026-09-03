import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ReactLenis } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function SmoothScroll({ children }) {
  const lenisRef = useRef();

  useGSAP(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => gsap.ticker.remove(update);
  });

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{ autoRaf: false }}
      onScroll={ScrollTrigger.update}
    >
      {children}
    </ReactLenis>
  );
}