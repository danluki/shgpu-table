"use client";
import React from "react";
import { useTypewriter } from "react-simple-typewriter";

const Welcome = () => {
  const [text] = useTypewriter({
    words: [
      "Используется студентами",
      "Сделано студентами",
      "Для студентов с любовью",
    ],
    loop: true
  });
  return (
    <div className="flex h-screen text-center overflow-hidden">
      <div className="m-auto space-y-16 text-red">
        <div>
          <h1 className="break-words font-bold mb-5 md:text-7xl outline-none text-5xl">
            Расписание ШГПУ
          </h1>
          <p className="py-6 text-xl">{text}</p>
          <div className="flex justify-center">
            <a href="#begin">
              <div className="animate-bounce bg-[#191919] flex h-10 hover:bg-[#202020] items-center justify-center p-2 ring-1 ring-slate-200-20 rounded-full w-10">
                <svg
                  className="h-6 text-[#772CE8] w-6"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
