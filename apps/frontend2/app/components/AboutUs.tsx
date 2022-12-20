import React from "react";

const AboutUs = () => {
  return (
    <section id="aboutus" className="mb-32 mx-6 text-center">
      <div className="p-7">
        <h2 className="text-white font-bold mb-5 text-5xl text-center">
          О нас
        </h2>
        <div className="gap-4 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
          <div className="duration-700 hover:-translate-y-2">
            <div className="bg-[#181818] block drop-shadow-xl rounded">
              <div className="p-6">
                <h3 className="font-bold mb-4 text-left text-xl">
                  Телеграм бот
                </h3>
                <h5 className="font-medium text-left text-lg text-white">
                  Получи доступ ко всем функциям системы, используя любимый
                  мессенджер!
                </h5>
              </div>
            </div>
          </div>
          <div className="duration-700 hover:-translate-y-2">
            <div className="bg-[#181818] block drop-shadow-xl rounded">
              <div className="p-6">
                <h3 className="font-bold mb-4 text-left text-xl">Веб клиент</h3>
                <h5 className="font-medium text-left text-lg text-white">
                  Получи доступ ко всем функциям системы, используя любой
                  браузер, с поддержкой JavaScript!
                </h5>
              </div>
            </div>
          </div>
          <div className="duration-700 hover:-translate-y-2">
            <div className="bg-[#181818] block drop-shadow-xl rounded">
              <div className="p-6">
                <h3 className="font-bold mb-4 text-left text-xl">
                  Мобильное приложение
                </h3>
                <h5 className="font-medium text-left text-lg text-white">
                  Получи доступ ко всем функциям системы, используя наше
                  мобильное приложение! (В разработке)
                </h5>
              </div>
            </div>
          </div>
          <div className="duration-700 hover:-translate-y-2">
            <div className="bg-[#181818] block drop-shadow-xl rounded">
              <div className="p-6">
                <h3 className="font-bold mb-4 text-left text-xl">
                  Бот Вконтакте
                </h3>
                <h5 className="font-medium text-left text-lg text-white">
                  Получи доступ ко всем функциям системы, используя Вконтакте!
                  (В разработке)
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
