import React from "react";
import TelegramLogo from "../../public/telegram.svg";
import WebLogo from "../../public/web.svg";
import PhoneLogo from "../../public/phone.svg";
import VkLogo from "../../public/vk.png";
import Image from "next/image";
const GettingStarted = () => {
  return (
    <section className="text-white m-auto" id="begin">
      <h2 className="text-white font-bold mb-5 text-4xl text-center">
        Готовы начать?🚀
      </h2>
      <div className="p7">
        <div className="gap-4 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
          <div className="duration-700 hover:-translate-y-2">
            <div className="bg-[#181818] block drop-shadow-xl rounded">
              <div className="p-6 items-center justify-center flex">
                <Image src={TelegramLogo} className="w-64 h-64" alt={""} />
              </div>
            </div>
          </div>
          <div className="duration-700 hover:-translate-y-2">
            <div className="bg-[#181818] block drop-shadow-xl rounded">
              <div className="p-6 items-center justify-center flex">
                <Image src={WebLogo} alt={""} className="w-64 h-64" />
              </div>
            </div>
          </div>
          <div className="duration-700 hover:-translate-y-2">
            <div className="bg-[#181818] block drop-shadow-xl rounded">
              <div className="p-6 items-center justify-center flex">
                <Image src={PhoneLogo} className="w-64 h-64" alt={""} />
              </div>
            </div>
          </div>
          <div className="duration-700 hover:-translate-y-2">
            <div className="bg-[#181818] block drop-shadow-xl rounded">
              <div className="p-6 items-center justify-center flex">
                <Image className="w-64 h-64" src={VkLogo} alt="VK" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GettingStarted;
