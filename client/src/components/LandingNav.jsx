import { HiMenuAlt3 } from "react-icons/hi";
import { NavLink } from "react-router-dom";

const LandingNav = () => {
  return (
    <header className="w-[calc(100%-20px)] md:w-[calc(100%-40px)] max-w-7xl h-12 mx-auto bg-(--land-bg-main) rounded-xl p-1 flex justify-between items-center fixed top-5 left-1/2 -translate-x-1/2 z-50 text-(--land-txt-main) leading-none tracking-tighter">
      <span className="text-lg md:text-xl font-ex relative left-0 md:left-2.5 text-left cursor-pointer">
        CodeStation
      </span>

      <nav className="hidden md:flex justify-center items-center font-rg gap-7.5">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-(--land-txt-sec) font-ex" : ""
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/courses"
          className={({ isActive }) =>
            isActive ? "text-(--land-txt-sec) font-ex" : ""
          }
        >
          Courses
        </NavLink>
        <NavLink
          to="/instructors"
          className={({ isActive }) =>
            isActive ? "text-(--land-txt-sec) font-ex" : ""
          }
        >
          Instructors
        </NavLink>
        <NavLink
          to="/testimonials"
          className={({ isActive }) =>
            isActive ? "text-(--land-txt-sec) font-ex" : ""
          }
        >
          Testimonials
        </NavLink>
      </nav>

      <button className="h-full px-5 py-1.5 rounded-lg bg-(--land-txt-main) text-(--land-bg-main) font-rg hidden md:flex justify-center items-center cursor-pointer relative overflow-hidden">
        <span className="absolute inset-0 bg-[conic-gradient(from_-90deg,#f48139,#e57549,#4b11cd,#f48139)] z-10 blur-xs scale-150"></span>
        <span className="relative z-20 text-sm md:text-lg leading-7 tracking-normal text-(--land-txt-main)">
          Signup
        </span>
      </button>

      <button className="md:hidden h-full aspect-square flex justify-center items-center">
        <HiMenuAlt3 className="text-xl" />
      </button>
    </header>
  );
};

export default LandingNav;
