"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import logoPic from "../../public/logo.png";
import hamburgerPic from "../../public/hamburger.png";
import Link from "next/link";
import useOutsideClick from "../hooks/useOutsideClick";

const Header = () => {
  const [isBurgerShow, setIsBurgerShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => {
    setIsBurgerShow(false);
  });

  return (
    <header>
      <div
        ref={ref}
        className="overflow-hidden bg-[#131313] drop-shadow-lg flex fixed items-center justify-between p-1 pt-1.5 select-none w-full text-white z-10"
      >
        <div className="flex items-center ml-2">
          <Image width={100} height={80} src={logoPic} alt="Logo" />
          <span className="hidden md:flex text-xl text-white font-bold ml-2">
            Расписание ШГПУ
          </span>
          <Image
            className="flex md:hidden fixed right-5"
            width={50}
            height={50}
            src={hamburgerPic}
            alt="Hamburger"
            onClick={() => setIsBurgerShow(!isBurgerShow)}
          />
        </div>
        <div className="hidden items-center justify-end space-x-2 w-full md:flex">
          <Link href="/table">Расписание</Link>
          <Link href="#about">О нас</Link>
          <Link href="#developers">Разработчикам</Link>
          <Link href="/donate">Донат</Link>
        </div>
        {isBurgerShow && (
          <div className="flex flex-col fixed left-0 p-5 top-[70px] w-screen text-2xl md:hidden">
            <Link href="/table">Расписание</Link>
            <Link href="#about">О нас</Link>
            <Link href="#developers">Разработчикам</Link>
            <Link href="/donate">Донат</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
