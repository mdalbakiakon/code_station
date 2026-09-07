import React from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "../pages/Landing";
import LandingLayout from "./LandingLayout";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<LandingLayout />}>
          <Route path="/" element={<Landing />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
