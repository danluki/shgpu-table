"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import useOutsideClick from "../../hooks/useOutsideClick";

const Header = () => {
  const ref = React.useRef<HTMLElement>(null);
  const [isBurgerShown, setIsBurgerShown] = React.useState(false);
  React.useEffect(() => {
    document.addEventListener("click", handleOutsideClick, true);
    return () => {
      document.removeEventListener("click", handleOutsideClick, true);
    };
    function handleOutsideClick(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        console.log("123");
        setIsBurgerShown(false);
      }
    }
  }, []);

  return (
    <header
      ref={ref}
      className="overflow-hidden bg-[#131313] drop-shadow-lg flex fixed items-center justify-between p-1 pt-1.5 select-none w-full text-white z-10"
    >
      <div className="flex items-center ml-2">
        <Link href="/">
          <Image width="56" height="40" src="/logo.png" alt="Logo" />
        </Link>
        <span className="font-bold ml-2 text-xl">Расписание ШГПУ</span>
      </div>
      <div className="md:space-x-5 space-x-2 flex">
        <div className="md:space-x-5 space-x-2 md:flex hidden">
          <Link href="">Расписание</Link>
          <Link href="#aboutus">О нас</Link>
          <Link href="#fordevelopers">Разработчикам</Link>
          <Link href="">Донат</Link>
        </div>
        <div className="flex justify-center md:hidden">
          <div></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
