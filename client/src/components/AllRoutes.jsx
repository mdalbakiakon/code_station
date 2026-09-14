import React from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing";
import LandingLayout from "./LandingLayout";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import StudentDash from "../pages/DashboardPages/StudentDash";

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<LandingLayout />}>
          <Route path="/" element={<Landing />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard">
          <Route path="student" element={<StudentDash />} />
        </Route>
      </Routes>
    </>
  );
};

export default AllRoutes;
