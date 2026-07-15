import React from "react";

const Login = () => {
  return (
    <div className="h-dvh w-full flex items-center justify-center p-2.5 bg-[linear-gradient(to_top_right,var(--col-surface)_70%,transparent)]">
      <div className="w-2/3 h-full shadow-2xl rounded-4xl overflow-hidden relative hidden lg:block">
        <img
          src="/login_hero.jpg"
          alt="login_hero_image"
          className="h-full w-full object-cover object-center opacity-50"
        />

        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_bottom,transparent_50%,var(--col-surface))] z-10">
          <div className="w-full h-full relative">
            <h2 className="text-xs absolute bottom-2 left-3 text-white/20 font-normal tracking-tighter select-none">
              To the bright
              <br />
              <span className="text-2xl font-bold text-white/40 leading-4.5">
                FUTURE
              </span>
            </h2>
          </div>
        </div>
      </div>


      <div className="flex-1 h-full flex flex-col items-center justify-center p-2.5 tracking-tighter">
        <img src="/logo.svg" alt="" className="w-35 aspect-square mb-15"/>
      </div>
    </div>
  );
};

export default Login;
