import { formatPairs } from "./functions/formatPairs";
import "dotenv/config";
import EventSource from "eventsource";
import cron from "node-cron";
import TelegramBot, { Message, KeyboardButton } from "node-telegram-bot-api";
import { ChatIsAlreadySubscribedError } from "./exceptions/ChatIsAlreadySubcribed";
import { convertDateToSimpleFormat } from "./functions/convertDateToSimpleFormat";
import { getWeekDayByNumber } from "./functions/getWeekDayByNumber";
import repository from "./repository";
import { pool } from "./repository/pool";
import { TableAPI } from "./tableApi";
import { UnknownGroupError } from "./exceptions/UnknownGroupError";
import { ApiError } from "./exceptions/ApiError";

const tableApi: TableAPI = new TableAPI(process.env.API_URL);
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

tableApi.addListener("tableCreated", async (data: any) => {
  const subs = await repository.getFacultySubscribers(data.faculty_id);
  const date: string =
    data.tableWeek.beginDate > new Date() ? "следущую" : "текущую";

  const mes = `🔥 Появилось расписание на ${date} неделю. 
  Можно посмотреть его, используя бота или скачав по ссылке 🧷 ${data.link}`;

  for (const sub of subs) {
    bot.sendMessage(sub.chatId, mes);
  }
});

tableApi.addListener("tableUpdated", async (data: any) => {
  const subs = await repository.getFacultySubscribers(data.faculty_id);
  const date: string =
    data.tableWeek.beginDate > new Date() ? "следущую" : "текущую";

  const mes = `🔥 Обновилось расписание на ${date} неделю. 
  Можно посмотреть его, используя бота или скачав по ссылке 🧷 ${data.link}`;

  for (const sub of subs) {
    bot.sendMessage(sub.chatId, mes);
  }
});

// cron.schedule("* * * * *", async () => {
//   try {
//     console.log("123");
//     const fac_subscribers = await repository.getFacultySubscribers(11);
//     console.log(fac_subscribers);
//     for (const sub of fac_subscribers) {
//       bot.sendMessage(sub.chatId, "rar;laqr;la");
//     }
//   } catch (e) {}
// });

async function start() {
  const client = await pool.connect();
  console.log("Successfully connected to db");
  console.log("Bot has been started 🚀.");

  bot.onText(/\/начать/, (msg: Message) => {
    console.log("123");
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
    const subscriber = await repository.getSubscriberByChatId(msg.chat.id);
    if (subscriber) {
    } else {
      bot.sendMessage(
        msg.chat.id,
        "Вы не подписаны не на одну из групп, пожалуйста, воспользуйтесь полной версией команды"
      );
    }
  });

  bot.onText(/Пары \S{1,} на неделю/gi, async (msg: Message) => {
    const groupName = msg.text.split(" ")[1];
    const pairs = await tableApi.getWeekPairs(groupName);

    if (!pairs) {
      bot.sendMessage(msg.chat.id, "😱 Нет информации о парах на неделю");
      return;
    }

    const pairsMessages = formatPairs(pairs);

    for (const mes of pairsMessages) {
      bot.sendMessage(msg.chat.id, mes);
    }
  });

  bot.onText(/Пары на след неделю/gi, async (msg: Message) => {
    const subscriber = await repository.getSubscriberByChatId(msg.chat.id);
    if (subscriber) {
    } else {
      bot.sendMessage(
        msg.chat.id,
        "Вы не подписаны не на одну из групп, пожалуйста, воспользуйтесь полной версией команды"
      );
    }
  });

  bot.onText(/Пары \S{1,} на след неделю/gi, async (msg: Message) => {
    const groupName = msg.text.split(" ")[1];
    const pairs = await tableApi.getWeekPairs(groupName, false);

    if (!pairs) {
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
  });

  bot.onText(
    /Подпиши на \S{1,}/,
    async (msg: Message, matches: RegExpExecArray) => {
      const groupName = msg.text.split(" ").pop();
      try {
        const group = await tableApi.getGroup(groupName);

        await repository.addNewSubscriber(
          msg.chat.id,
          groupName,
          group.faculty.id
        );

        bot.sendMessage(msg.chat.id, `Вы подписались на группу ${groupName}`);
      } catch (e) {
        console.log(e);
        if (e instanceof UnknownGroupError) {
          bot.sendMessage(
            msg.chat.id,
            `🤔 Не удалось найти группу ${groupName}.`
          );
        } else if (e instanceof ChatIsAlreadySubscribedError) {
          bot.sendMessage(
            msg.chat.id,
            `Не удалось подписаться на группу ${groupName}. Сначала отпишитесь от текущей.`
          );
        } else if (e instanceof ApiError && (e as ApiError).code === 500) {
          bot.sendMessage(
            msg.chat.id,
            `Не удалось подписаться на группу ${groupName}. Ошибка сервера.`
          );
        } else {
          bot.sendMessage(
            msg.chat.id,
            `Не удалось подписаться на группу ${groupName}. Неизвестная ошибка.`
          );
        }
      }
    }
  );

  bot.onText()

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
