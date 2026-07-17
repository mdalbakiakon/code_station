import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { X } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.status === "error") {
        setError(data.message);
      } else {
        navigate("/login");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <div className="h-dvh w-full flex items-center justify-center p-2.5 bg-[linear-gradient(to_top_right,var(--col-surface)_70%,transparent)]">
      <div className="w-2/3 h-full shadow-2xl rounded-4xl overflow-hidden relative hidden lg:block">
        <img
          src="/signup_hero.jpg"
          alt="signup_hero_image"
          className="h-full w-full object-cover object-center opacity-50"
        />

        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_bottom,transparent_50%,var(--col-surface))] z-10">
          <div className="w-full h-full relative">
            <h2 className="text-xs absolute bottom-2 left-3 text-white/20 font-normal tracking-tighter select-none">
              Code Your
              <br />
              <span className="text-2xl font-bold text-white/40 leading-4.5">
                DESTINATION
              </span>
            </h2>
          </div>
        </div>
      </div>


      {/* signup form */}
      <div className="flex-1 h-full flex flex-col items-center justify-center p-2.5 tracking-tighter">
        <img
          src="/logo.svg"
          alt=""
          className="w-15 lg:w-30 aspect-square mb-10"
        />

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-75 flex flex-col gap-3.5 text-sm"
        >
          <h2 className="text-[28px] text-center font-bold mb-3.5 select-none">
            Create an account
          </h2>

          {error && (
            <div className="fixed bottom-2.5 right-2.5 flex justify-center items-center gap-1.5 text-sm bg-red-500 text-white rounded-lg px-3 py-2">
              {error}{" "}
              <X
                onClick={() => setError(null)}
                strokeWidth={3.5}
                className="cursor-pointer w-5 aspect-square"
              />
            </div>
          )}

          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={formData.name}
            onChange={handleChange}
            required
            className="bg-(--col-bg) placeholder:text-sm placeholder:text-white/25 rounded-lg px-3 py-2 outline-none focus:bg-(--col-bg-secondary)"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="bg-(--col-bg) placeholder:text-sm placeholder:text-white/25 rounded-lg px-3 py-2 outline-none focus:bg-(--col-bg-secondary)"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="bg-(--col-bg) placeholder:text-sm placeholder:text-white/25 rounded-lg px-3 py-2 outline-none focus:bg-(--col-bg-secondary)"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-white text-(--col-bg) font-bold rounded-lg px-3 py-2 hover:bg-white/90 disabled:opacity-50 cursor-pointer select-none"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-xs font-semibold text-white/40 mt-3.5">
          Already have an account?{" "}
          <Link to="/login" className="underline hover:text-white/80">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
