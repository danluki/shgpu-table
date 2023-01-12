import React from "react";

const Welcome = () => {
  return (
    <div className="flex h-screen text-center overflow-hidden">
      <div className="m-auto space-y-16 text-red">
        <div>
          <h1 className="break-words font-bold mb-5 md:text-7xl outline-none text-5xl">
            Расписание ШГПУ
          </h1>
          {/* <p class="py-6 text-xl">
          <Typewriter
            :words="data"
            :loop="0"
            :delay-speed="1500"
            :delete-speed="60"
            :type-speed="40"
            :cursor="true"
            :cursor-blinking="true"
            :cursor-style="'|'"
            :cursor-color="'#FFFFFF'"
            class="color-white text-xl py-6"
          />
          <span style="color: #772ce8"> Сделано для студентов</span
          >.<br />Используется <span style="color: #772ce8">студентами</span>.
          Для студентов с любовью
        </p> */}
          <div className="flex justify-center">
            <a href="#begin">
              <div className="animate-bounce bg-[#191919] flex h-10 hover:bg-[#202020] items-center justify-center p-2 ring-1 ring-slate-200-20 rounded-full w-10">
                {/* //<Go /> */}
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
