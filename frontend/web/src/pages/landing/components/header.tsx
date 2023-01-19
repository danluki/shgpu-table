import React from "react";
import { Link } from "react-router-dom";

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
        setIsBurgerShown(false);
      }
    }
  }, []);

  React.useEffect(() => {
    console.log(isBurgerShown);
  }, [isBurgerShown]);

  return (
    <header
      ref={ref}
      className="overflow-hidden bg-[#131313] drop-shadow-lg flex fixed items-center justify-between p-1 pt-1.5 select-none w-full text-white z-10"
    >
      <div className="flex items-center ml-2">
        <Link to="/">
          <img width="56" height="40" src="/logo.png" alt="Logo" />
        </Link>
        <span className="font-bold ml-2 text-xl">Расписание ШГПУ</span>
      </div>
      <div className="md:space-x-5 space-x-2 flex">
        <div className="md:space-x-5 space-x-2 md:flex hidden">
          <Link to="">Расписание</Link>
          <Link to="#aboutus">О нас</Link>
          <Link to="#fordevelopers">Разработчикам</Link>
          <Link to="">Донат</Link>
        </div>
        <div className="flex justify-center md:hidden">
          <div>
            <div className="relative">
              <button
                onClick={() => setIsBurgerShown(!isBurgerShown)}
                className="duration-500 ease-in-out flex focus:outline-none focus:ring-0 font-medium hover:bg-[#9146FF] items-center leading-tight px-2 py-2 rounded shadow text-white text-xs transition uppercase whitespace-nowrap"
              >
                <img src="/hamburger.png" width={32} height={32} alt="Burger" />
              </button>
            </div>
            {isBurgerShown && (
              <ul className="fixed p-5 w-screen duration-500 ease-linear list-none z-50 bg-[#141414] rounded text-2xl">
                <hr className="border border-gray-700 border-solid border-t-0 h-0 opacity-50" />
                <li className="hover:bg-[#9146FF]">Расписание</li>
                <li className="hover:bg-[#9146FF]">О нас</li>
                <li className="hover:bg-[#9146FF]">Разработчикам</li>
                <li className="hover:bg-[#9146FF]">Донат</li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
