import React from "react";
import { Link, NavLink } from "react-router-dom";

const LandingNav = () => {
  return (
    <header className="w-[calc(100%-40px)] max-w-7xl h-12 mx-auto bg-black rounded-xl p-1 flex justify-between items-center fixed top-5 left-1/2 -translate-x-1/2 z-50 text-[#f5f5f5] leading-none tracking-tighter">
      <span className="text-xl font-ex relative left-2.5">CodeStation</span>

      <nav className="flex justify-center items-center font-lt gap-7.5">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "text-accent font-ex" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/courses"
          className={({ isActive }) => (isActive ? "text-accent font-ex" : "")}
        >
          Courses
        </NavLink>
        <NavLink
          to="/instructors"
          className={({ isActive }) => (isActive ? "text-accent font-ex" : "")}
        >
          Instructors
        </NavLink>
        <NavLink
          to="/testimonials"
          className={({ isActive }) => (isActive ? "text-accent font-ex" : "")}
        >
          Testimonials
        </NavLink>
      </nav>

      <button className="h-full px-4.5 rounded-lg bg-[#f5f5f5] text-[#111] font-ex flex justify-center items-center leading-0">
        Signup
      </button>
    </header>
  );
};

export default LandingNav;
