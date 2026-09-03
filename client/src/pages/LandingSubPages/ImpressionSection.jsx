import React from "react";

const ImpressionSection = () => {
  return (
    <section>
      <div className="w-full h-fit flex justify-center items-center gap-1 p-2.5 my-47">
        <div className="flex-1 flex flex-col rounded-[50px] bg-(--land-txt-main) aspect-square p-7.5 gap-7.5">
          <div>
            <h2 className="text-4xl font-lt leading-none tracking-tighter text-(--land-txt-sub)">
              Can't keep up?
            </h2>
            <h3 className="font-lt text-3xl mt-2.5 leading-none tracking-tighter">
              You don't have to. Keep your own pace as long as it takes.
            </h3>
          </div>

          <div className="flex-1 grid grid-cols-3 grid-rows-3 grid-flow-row gap-2.5">
            <div className="row-span-3  rounded-[50px] bg-(--land-txt-sub)/50"></div>

            <div className="col-span-2  rounded-[50px] bg-(--land-txt-sub) relative overflow-hidden p-7.5">

              <div className="absolute inset-0 w-full h-full bg-[conic-gradient(from_-90deg,#f48139,#e57549,#4b11cd,#f48139)] z-10 blur-lg scale-125"></div>

              

              <h2 className="font-ex leading-none tracking-tighter text-(--land-txt-main) text-3xl relative z-30">
                Your entire progress <br /> on one canvas
              </h2>
            </div>

            <div className="row-span-2 rounded-[50px] bg-(--land-txt-sub)/50"></div>

            <div className="row-span-2  rounded-[50px] bg-(--land-txt-sub)/50"></div>
          </div>
        </div>

        <div className="flex-1 rounded-[50px] bg-(--land-txt-main) aspect-square p-7.5 bg-[url('/FREE.png')] bg-cover bg-top relative">
          <h2 className="text-9xl text-right text-white mix-blend-difference font-ex leading-[0.75] tracking-tighter absolute right-7.5 bottom-12.5 left-15">
            "Rome wasn't built in a day"
          </h2>
        </div>
      </div>
    </section>
  );
};

export default ImpressionSection;
