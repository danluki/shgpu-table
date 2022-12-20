"use client";
import React from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import arrowImg from "../../public/arrow.png";
import Image from "next/image";
const Welcome = () => {
  const [text, count] = useTypewriter({
    words: [
      "Придумано студентами",
      "Сделано для студентов",
      "Используется студентами",
      "Для студентов с любовью",
    ],
    loop: true,
    delaySpeed: 2000,
  });
  return (
    <section>
      <motion.div
        initial={{ opacity: 0.9 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex h-screen text-center overflow-hidden bg-[#131313]"
      >
        <div className="m-auto space-y-16 text-white">
          <div>
            <h1 className="break-words font-bold mb-5 md:text-7xl outline-none text-5xl">
              Расписание ШГПУ
            </h1>
            <p className="text-xl py-6">
              {text}
              <Cursor cursorColor="#FFFFFF" />
            </p>
          </div>
          <div className="flex justify-center">
            <div
              className="animate-bounce bg-[#191919] flex h-10 hover:bg-[#202020] 
            items-center justify-center p-2 ring-1 ring-slate-200/20 rounded-full w-10"
            >
              <Image src={arrowImg} alt="|" />
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Welcome;
