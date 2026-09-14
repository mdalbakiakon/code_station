import React, { useState } from "react";
import { CgMathPlus } from "react-icons/cg";

const ErrorBox = ({ err }) => {
  const [cancel, setCancel] = useState(false);

  return (
    <div
      className={`fixed right-2.5 bottom-2.5 bg-red-500 text-(--land-txt-main) text-sm font-ex leading-none tracking-tighter max-w-75 px-2.5 py-1.5 rounded-lg h-auto justify-between items-center gap-1.5 ${cancel ? "hidden" : "flex"}`}
    >
      <span className="line-clamp-3">{err}</span>
      <span
        onClick={() => setCancel(true)}
        className="flex justify-center items-center h-full aspect-square cursor-pointer"
      >
        <CgMathPlus className="text-lg stroke-1 rotate-45" />
      </span>
    </div>
  );
};

export default ErrorBox;
