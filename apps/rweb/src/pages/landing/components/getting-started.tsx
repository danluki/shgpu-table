import React from "react";

const GettingStarted = () => {
  return (
    <section className="text-white m-auto" id="begin">
      <h2 className="text-white font-bold mb-5 text-4xl text-center">
        Готовы начать?🚀
      </h2>
      <div className="p-7">
        <div className="gap-4 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
          <div className="duration-700 hover:-translate-y-2">
            <div className="bg-[#181818] block drop-shadow-xl rounded">
              <div className="p-6 items-center justify-center flex">
                <img
                  src="/telegram.svg"
                  alt="telegram"
                  width={256}
                  height={256}
                />
              </div>
            </div>
          </div>
          <div className="duration-700 hover:-translate-y-2">
            <div className="bg-[#181818] block drop-shadow-xl rounded">
              <div className="p-6 items-center justify-center flex">
                <img src="/web.svg" alt="web" width={256} height={256} />
              </div>
            </div>
          </div>
          <div className="duration-700 hover:-translate-y-2">
            <div className="bg-[#181818] block drop-shadow-xl rounded">
              <div className="p-6 items-center justify-center flex">
                <img src="/phone.svg" alt="phone" width={256} height={256} />
              </div>
            </div>
          </div>
          <div className="duration-700 hover:-translate-y-2">
            <div className="bg-[#181818] block drop-shadow-xl rounded">
              <div className="p-6 items-center justify-center flex">
                <img src="/vk.png" alt="vk" width={256} height={256} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GettingStarted;
