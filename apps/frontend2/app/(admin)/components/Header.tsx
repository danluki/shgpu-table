"use client";
import React from "react";
import Image from "next/image";
import logoPic from "/public/logo.png";
const Header = () => {
  return (
    <header>
      <div className="w-full flex-row items-center justify-start bg-[#131313] drop-shadow-lg z-10 text-white fixed">
        <div className="flex flex-row items-center">
          <Image width={50} height={50} src={logoPic} alt="Logo" />
          <span className="text-xl text-white font-bold ml-2">
            Админ панель бота
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
