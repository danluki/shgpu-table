import { formatSchedule } from "./functions/formatSchedule";
import { ScheduleError } from "./exceptions/ScheduleError";
import { formatPairs } from "./functions/formatPairs";
import "dotenv/config";
import cron from "node-cron";
import TelegramBot, { Message } from "node-telegram-bot-api";
import { ChatIsAlreadySubscribedError } from "./exceptions/ChatIsAlreadySubcribed";
import repository from "./repository";
import { pool } from "./repository/pool";
import { TableAPI } from "./tableApi";
import { UnknownGroupError } from "./exceptions/UnknownGroupError";
import { ApiError } from "./exceptions/ApiError";
import { GetPairsError } from "./exceptions/GetPairsError";

const tableApi: TableAPI = new TableAPI(process.env.API_URL);
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

tableApi.addListener("tableCreated", async (data: any) => {
  const { tableWeek, faculty, link } = JSON.parse(data);

  const subs = await repository.getFacultySubscribers(faculty.id);
  const date: string =
    tableWeek.beginDate > new Date() ? "следущую" : "текущую";

  const mes = `🔥 Появилось расписание на ${date} неделю. 
  Можно посмотреть его, используя бота или скачав по ссылке 🧷 ${link}`;

  for (const sub of subs) {
    bot.sendMessage(sub.chat_id, mes);
  }
});

tableApi.addListener("tableUpdated", async (data: any) => {
  const { tableWeek, faculty, link } = JSON.parse(data);
  const subs = await repository.getFacultySubscribers(faculty.id);
  const date: string =
    tableWeek.beginDate > new Date() ? "следущую" : "текущую";

  const mes = `🔥 Обновилось расписание на ${date} неделю. 
  Можно посмотреть его, используя бота или скачав по ссылке 🧷 ${link}`;

  for (const sub of subs) {
    bot.sendMessage(sub.chat_id, mes);
  }
});

cron.schedule("0 18 * * *", async () => {
  const subscribers = await repository.getFacultySubscribers(11);
  for (const sub of subscribers) {
    bot.sendMessage(sub.chat_id, "rar;laqr;la");
  }
});

cron.schedule("0 7 * * *", async () => {
  const subscribers = await repository.getFacultySubscribers(11);
  for (const sub of subscribers) {
    bot.sendMessage(sub.chat_id, "rar;laqr;la");
  }
});

process.on("uncaughtException", (err) => {
  console.log(err);
  console.log("Бот упал 🔊");
  process.exit(-1);
});

async function start() {
  await pool.connect();
  console.log("Successfully connected to db");
  console.log("Bot has been started 🚀.");

  bot.onText(/\/начать/, (msg: Message) => {
    bot.sendMessage(
      msg.chat.id,
      "Добро пожаловать в неофицального ШГПУ бота с расписанием",
      {
        reply_markup: {
          keyboard: [
            [{ text: "Пары на неделю" }, { text: "Пары на след неделю" }],
            [{ text: "Пары завтра" }, { text: "Пары сегодня" }],
            [
              { text: "⌚️ Звонки" },
              { text: "💾 Скачать" },
              { text: "🆘 Помощь" },
            ],
          ],
        },
      }
    );
  });

  bot.onText(/Пары на неделю/gi, async (msg: Message) => {
    try {
      const subscriber = await repository.getSubscriberByChatId(msg.chat.id);
      if (subscriber) {
        const pairs = await tableApi.getWeekPairs(subscriber.group_name, true);

        if (!pairs.length) {
          bot.sendMessage(msg.chat.id, "😱 Нет информации о парах на неделю");
          return;
        }
        const pairsMessages = formatPairs(pairs);

        for (const mes of pairsMessages) {
          await bot.sendMessage(msg.chat.id, mes);
        }
      } else {
        bot.sendMessage(
          msg.chat.id,
          "Вы не подписаны не на одну из групп, пожалуйста, воспользуйтесь полной версией команды"
        );
      }
    } catch (e) {
      if (e instanceof GetPairsError) {
        bot.sendMessage(msg.chat.id, "Не удалось получить расписание");
      }
      console.log(e.message);
    }
  });

  bot.onText(/Пары \S{1,} на неделю/gi, async (msg: Message) => {
    const groupName = msg.text.split(" ")[1];
    try {
      const group = await tableApi.getGroup(groupName);

      const pairs = await tableApi.getWeekPairs(groupName, true);

      if (!pairs.length || !pairs) {
        bot.sendMessage(msg.chat.id, "😱 Нет информации о парах на неделю");
        return;
      }
      const pairsMessages = formatPairs(pairs);

      for (const mes of pairsMessages) {
        await bot.sendMessage(msg.chat.id, mes);
      }
    } catch (e) {
      if (e instanceof UnknownGroupError) {
        bot.sendMessage(
          msg.chat.id,
          `🤔 Не удалось найти группу ${groupName}.`
        );
        return;
      }
      if (e instanceof GetPairsError) {
        bot.sendMessage(msg.chat.id, "Не удалось получить расписание");
      }
      console.log(e);
    }
  });

  bot.onText(/Пары на след неделю/gi, async (msg: Message) => {
    try {
      const subscriber = await repository.getSubscriberByChatId(msg.chat.id);
      if (subscriber) {
        const pairs = await tableApi.getWeekPairs(subscriber.group_name, false);

        if (!pairs.length) {
          bot.sendMessage(
            msg.chat.id,
            "😱 Нет информации о парах на следущую неделю"
          );
          return;
        }
        const pairsMessages = formatPairs(pairs);
        for (const mes of pairsMessages) {
          await bot.sendMessage(msg.chat.id, mes);
        }
      } else {
        bot.sendMessage(
          msg.chat.id,
          "Вы не подписаны не на одну из групп, пожалуйста, воспользуйтесь полной версией команды"
        );
      }
    } catch (err) {
      console.log(err);
      if (err instanceof GetPairsError) {
        bot.sendMessage(msg.chat.id, "Не удалось получить расписание");
      }
    }
  });

  bot.onText(/Пары \S{1,} на след неделю/gi, async (msg: Message) => {
    const groupName = msg.text.split(" ")[1];

    try {
      const group = await tableApi.getGroup(groupName);

      const pairs = await tableApi.getWeekPairs(groupName, false);

      if (!pairs.length) {
        bot.sendMessage(
          msg.chat.id,
          "😱 Нет информации о парах на следущую неделю"
        );
        return;
      }

      const pairsMessages = formatPairs(pairs);

      for (const mes of pairsMessages) {
        bot.sendMessage(msg.chat.id, mes);
      }
    } catch (err) {
      if (err instanceof UnknownGroupError) {
        bot.sendMessage(
          msg.chat.id,
          `🤔 Не удалось найти группу ${groupName}.`
        );
        return;
      }
      if (err instanceof GetPairsError) {
        bot.sendMessage(msg.chat.id, "Не удалось получить расписание");
      }
      console.log(err);
    }
  });

  bot.onText(/Пары на завтра/gi, async (msg: Message) => {
    try {
      const subscriber = await repository.getSubscriberByChatId(msg.chat.id);
      if (subscriber) {
        const pairs = await tableApi.getPairs(subscriber.group_name, 1, 1);

        if (!pairs.length) {
          bot.sendMessage(msg.chat.id, "😱 Нет информации о парах на завтра");
          return;
        }
        const pairsMessages = formatPairs(pairs);
        for (const mes of pairsMessages) {
          await bot.sendMessage(msg.chat.id, mes);
        }
      } else {
        bot.sendMessage(
          msg.chat.id,
          "Вы не подписаны не на одну из групп, пожалуйста, воспользуйтесь полной версией команды"
        );
      }
    } catch (err) {
      console.log(err);
      if (err instanceof GetPairsError) {
        bot.sendMessage(msg.chat.id, "Не удалось получить расписание");
      }
    }
  });

  bot.onText(/Пары \S{1,} на завтра/gi, async (msg: Message) => {
    const groupName = msg.text.split(" ")[1];
    try {
      const group = await tableApi.getGroup(groupName);

      const pairs = await tableApi.getPairs(groupName, 1, 1);

      if (!pairs.length) {
        bot.sendMessage(msg.chat.id, "😱 Нет информации о парах на завтра");
        return;
      }
      const pairsMessages = formatPairs(pairs);
      for (const mes of pairsMessages) {
        await bot.sendMessage(msg.chat.id, mes);
      }
    } catch (err) {
      if (err instanceof UnknownGroupError) {
        bot.sendMessage(
          msg.chat.id,
          `🤔 Не удалось найти группу ${groupName}.`
        );
        return;
      }
      if (err instanceof GetPairsError) {
        bot.sendMessage(msg.chat.id, "Не удалось получить расписание");
      } else if (err instanceof ApiError && (err as ApiError).code === 500) {
        bot.sendMessage(
          msg.chat.id,
          `Не удалось подписаться на группу ${groupName}. Ошибка сервера.`
        );
      }
      console.log(err);
    }
  });

  bot.onText(/Пары на сегодня/gi, async (msg: Message) => {
    try {
      const subscriber = await repository.getSubscriberByChatId(msg.chat.id);
      if (subscriber) {
        const pairs = await tableApi.getPairs(subscriber.group_name, 0, 1);

        if (!pairs) {
          bot.sendMessage(msg.chat.id, "😱 Нет информации о парах на сегодня");
          return;
        }
        const pairsMessages = formatPairs(pairs);
        for (const mes of pairsMessages) {
          await bot.sendMessage(msg.chat.id, mes);
        }
      } else {
        bot.sendMessage(
          msg.chat.id,
          "Вы не подписаны не на одну из групп, пожалуйста, воспользуйтесь полной версией команды"
        );
      }
    } catch (err) {
      console.log(err);
      if (err instanceof GetPairsError) {
        bot.sendMessage(msg.chat.id, "Не удалось получить расписание");
      }
    }
  });

  bot.onText(/Пары \S{1,} на сегодня/gi, async (msg: Message) => {
    const groupName = msg.text.split(" ")[1];
    try {
      const group = await tableApi.getGroup(groupName);

      const pairs = await tableApi.getPairs(groupName, 0, 1);

      if (!pairs) {
        bot.sendMessage(msg.chat.id, "😱 Нет информации о парах на сегодня");
        return;
      }
      const pairsMessages = formatPairs(pairs);
      for (const mes of pairsMessages) {
        await bot.sendMessage(msg.chat.id, mes);
      }
    } catch (err) {
      if (err instanceof UnknownGroupError) {
        bot.sendMessage(
          msg.chat.id,
          `🤔 Не удалось найти группу ${groupName}.`
        );
        return;
      }
      if (err instanceof GetPairsError) {
        bot.sendMessage(msg.chat.id, "Не удалось получить расписание");
      }
      console.log(err);
    }
  });

  bot.onText(
    /Подпиши на \S{1,}/,
    async (msg: Message, matches: RegExpExecArray) => {
      const groupName = msg.text.split(" ").pop();
      tableApi
        .getGroup(groupName)
        .then((group) => {
          repository
            .addNewSubscriber(msg.chat.id, groupName, 11)
            .then(() => {
              bot.sendMessage(
                msg.chat.id,
                `Вы подписались на группу ${groupName}`
              );
            })
            .catch((err) => {
              if (err instanceof ChatIsAlreadySubscribedError) {
                bot.sendMessage(
                  msg.chat.id,
                  `Не удалось подписаться на группу ${groupName}. Сначала отпишитесь от текущей.`
                );
                return;
              } else if (
                err instanceof ApiError &&
                (err as ApiError).code === 500
              ) {
                bot.sendMessage(
                  msg.chat.id,
                  `Не удалось подписаться на группу ${groupName}. Ошибка сервера.`
                );
                return;
              } else {
                bot.sendMessage(
                  msg.chat.id,
                  `Не удалось подписаться на группу ${groupName}.`
                );
                console.log(err);
                return;
              }
            });
        })
        .catch((err) => {
          if (err instanceof UnknownGroupError) {
            bot.sendMessage(
              msg.chat.id,
              `🤔 Не удалось найти группу ${groupName}.`
            );
            return;
          } else if (
            err instanceof ApiError &&
            (err as ApiError).code === 500
          ) {
            bot.sendMessage(
              msg.chat.id,
              `Не удалось подписаться на группу ${groupName}. Ошибка сервера.`
            );
            return;
          } else {
            bot.sendMessage(
              msg.chat.id,
              `Не удалось подписаться на группу ${groupName}.`
            );
            console.log(err);
            return;
          }
        });
    }
  );

  //   bot.onText(/Помощь/gi, async (msg: Message) => {
  //     bot.sendMessage(
  //       msg.chat.id,
  //       `
  // "Подпиши на 230Б" - Подписаться на расписание группы
  // "Пары 231Б на неделю" - Получить расписание группы на неделю
  //     `
  //     );
  //   });

  bot.onText(/Скачать/gi, async (msg: Message) => {});

  bot.onText(/Звонки/gi, async (msg: Message) => {
    try {
      const schedule = await tableApi.getSchedule();
      const scheduleMessage = formatSchedule(schedule);
      await bot.sendMessage(msg.chat.id, scheduleMessage);
    } catch (e) {
      if (e instanceof ApiError && (e as ApiError).code === 500) {
        bot.sendMessage(
          msg.chat.id,
          `Не удалось получить расписание. Ошибка сервера.`
        );
      } else if (e instanceof ScheduleError) {
        bot.sendMessage(msg.chat.id, `Не удалось получить расписание.`);
        return;
      }
      console.log(e);
    }
  });

  bot.onText(/Забудь меня/gi, async (msg: Message) => {
    try {
      const res = await repository.removeSubscriber(msg.chat.id);
      if (res) bot.sendMessage(msg.chat.id, `Вы успешно отписалиcь от группы.`);
      else
        bot.sendMessage(
          msg.chat.id,
          `Вы ещё не подписаны на обновления какой-то группы.`
        );
    } catch (e) {
      console.log(e);
      bot.sendMessage(msg.chat.id, `Не удалось отписаться от группы.`);
    }
  });
}

start();
