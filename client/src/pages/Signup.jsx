import React, { useState } from "react";
import api from "../api/axios.js";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await api.post("/auth/register", {
        identifier: formData.email,
        password: formData.password,
      });

      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-svh bg-(--landing-bg-main) flex justify-center items-center gap-1 p-1">
      <div className="flex-1 h-full [clip-path:inset(0_round_50px)] relative">
        <img
          src="/signup.webp"
          alt="code-station-signup"
          fetchPriority="high"
          loading="eager"
          className="w-full h-full object-center object-cover select-none"
        />

        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,black_120%)] font-ex text-2xl text-left leading-none tracking-tighter text-(--land-txt-main) p-7.5 z-10">
          <div className="relative h-full w-full">
            <div className="absolute bottom-0 left-0 flex flex-col justify-center items-start">
              <h2>To Bright Future</h2>
              <p className="text-sm text-(--land-txt-sub)/50 tracking-tight">
                Just a step away from architecturing your destiny
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* signning up form */}
      <div className="flex-1 h-full flex items-center justify-center font-rg leading-none tracking-tight">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm flex flex-col gap-6"
        >
          <div className="flex flex-col gap-1 mb-2">
            <h1 className="font-ex text-3xl tracking-tighter leading-none text-(--land-txt-main)">
              Create your account
            </h1>
            <p className="text-sm font-ex text-(--land-txt-sub)/60">
              Start building toward what's next.
            </p>
          </div>

          {error && (
            <div className="text-sm text-red-500 bg-red-500/10 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm text-(--land-txt-sub)/70">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full bg-transparent border border-(--land-txt-sub)/20 rounded-lg px-3.5 py-2.5 text-(--land-txt-main) text-base leading-normal placeholder:text-sm placeholder:leading-normal placeholder:text-(--land-txt-sub)/40 outline-none focus:border-(--land-txt-main)/60 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm text-(--land-txt-sub)/70">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              value={formData.password}
              onChange={handleChange}
              placeholder="At least 8 characters"
              className="w-full bg-transparent border border-(--land-txt-sub)/20 rounded-lg px-3.5 py-2.5 text-(--land-txt-main) text-base leading-normal placeholder:text-sm placeholder:leading-normal placeholder:text-(--land-txt-sub)/40 outline-none focus:border-(--land-txt-main)/60 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-(--land-txt-main) text-(--landing-bg-main) rounded-lg py-2.5 text-base font-medium mt-2 disabled:opacity-50 transition-opacity tracking-tighter font-ex cursor-pointer"
          >
            {loading ? "Creating account…" : "Create account"}
          </button>

          <p className="text-sm text-(--land-txt-sub)/60 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-(--land-txt-main) underline underline-offset-2">
              Log in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;