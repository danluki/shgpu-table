import React from "react";

const Capabilities = () => {
  return (
    <section id="capabilities" className="mb-32 mx-6 text-center text-white">
      <div className="p-7">
        <h3 className="text-white font-bold mb-5 text-4xl text-center">
          Возможности
        </h3>
        <div className="gap-4 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2">
          <div className="duration-700 hover:-translate-y-2">
            <div className="bg-[#181818] block drop-shadow-xl rounded">
              <div className="p-6">
                <h3 className="font-bold mb-4 text-left text-xl">
                  Обновление расписания
                </h3>
                <h5 className="font-medium text-left text-lg text-white">
                  Каждые два часа мы проверяем расписание на изменения и
                  сообщаем вам об этом. 🚀
                </h5>
              </div>
            </div>
          </div>
          <div className="duration-700 hover:-translate-y-2">
            <div className="bg-[#181818] block drop-shadow-xl rounded">
              <div className="p-6">
                <h3 className="font-bold mb-4 text-left text-xl">
                  Поиск по преподавателю
                </h3>
                <h5 className="font-medium text-left text-lg text-white">
                  Мы можем найти пары даже по части фамилии преподавателя. Даже
                  если он работает на нескольких факультетах
                </h5>
              </div>
            </div>
          </div>
          <div className="duration-700 hover:-translate-y-2">
            <div className="bg-[#181818] block drop-shadow-xl rounded">
              <div className="p-6">
                <h3 className="font-bold mb-4 text-left text-xl">
                  Пары на следущую неделю
                </h3>
                <h5 className="font-medium text-left text-lg text-white">
                  Как только на сайте опубликуют расписание на следущую неделю
                  вы получите уведомление.
                </h5>
              </div>
            </div>
          </div>
          <div className="duration-700 hover:-translate-y-2">
            <div className="bg-[#181818] block drop-shadow-xl rounded">
              <div className="p-6">
                <h3 className="font-bold mb-4 text-left text-xl">
                  Пары за любую дату
                </h3>
                <h5 className="font-medium text-left text-lg text-white">
                  Мы сохраняем расписание в базе, поэтому вы можете посмотреть
                  историю пар.
                </h5>
              </div>
            </div>
          </div>
          <div className="duration-700 hover:-translate-y-2">
            <div className="bg-[#181818] block drop-shadow-xl rounded">
              <div className="p-6">
                <h3 className="font-bold mb-4 text-left text-xl">
                  Поддержка всех факультетов.
                </h3>
                <h5 className="font-medium text-left text-lg text-white">
                  Мы работаем одинаково для всех факультетов, включая
                  университетский колледж.
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
