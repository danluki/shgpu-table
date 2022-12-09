import React from "react";
import Image from "next/image";
import logoPic from "../../public/logo.png";
import Link from "next/link";

const Header = () => {
  return (
    <header>
      <div className="w-full flex-row items-center justify-evenly bg-[#131313] drop-shadow-lg z-10">
        <div className="flex flex-row items-center">
          <Image width={100} height={80} src={logoPic} alt="Logo" />
          <span className="text-xl text-white font-bold ml-2">
            Расписание ШГПУ
          </span>
        </div>
        <div className="flex items-center justify-between mr-5">
          <Link className="ml-10" href="/table">
            Расписание
          </Link>
          <Link href="#about">О нас</Link>
          <Link href="#developers">Разработчикам</Link>
          <Link href="/donate">Донат</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
