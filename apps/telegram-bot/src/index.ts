import axios from "axios";
import "dotenv/config";
import TelegramBot, { Message, KeyboardButton } from "node-telegram-bot-api";
import { ChatIsAlreadySubscribedError } from "./exceptions/ChatIsAlreadySubcribed";
import { getGroupByName } from "./functions/getGroupByName";
import repository from "./repository";
import { pool } from "./repository/pool";

async function start() {
  const client = await pool.connect();
  console.log("Successfully connected to db");
  console.log("Bot has been started 🚀.");
  const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

  bot.onText(/\/start/, (msg: Message) => {
    bot.sendMessage(
      msg.chat.id,
      "Добро пожаловать в неофицального ШГПУ бота с расписанием",
      {
        reply_markup: {
          keyboard: [
            [{ text: "Подпиши на группу" }],
            [{ text: "Пары на неделю" }, { text: "Пары по преподавателю" }],
            [{ text: "Пары на следующую неделю" }],
          ],
        },
      }
    );
  });

  bot.onText(/Пары на неделю/gi, (msg: Message) => {
    const subscribed_group = repository.getGroupByChatId(msg.chat.id);
  });

  bot.onText(/Пары \S{1,} на неделю/gi, (msg: Message) => {
    console.log("С группой");
  });

  bot.onText(
    /Подпиши на \S{1,}/,
    async (msg: Message, matches: RegExpExecArray) => {
      const groupName = msg.text.split(" ").pop();
      const group = await getGroupByName(groupName);
      if (!group) {
        bot.sendMessage(
          msg.chat.id,
          `Не удалось подписаться на группу ${groupName}.`
        );
        return;
      }
      try {
        const res = await repository.addNewSubscriber(
          msg.chat.id,
          groupName,
          group.faculty_id
        );
      } catch (err) {
        if (err instanceof ChatIsAlreadySubscribedError) {
          bot.sendMessage(
            msg.chat.id,
            `Не удалось подписаться на группу ${groupName}. Сначала отпишитесь от текущей.`
          );
        } else {
          bot.sendMessage(
            msg.chat.id,
            `Не удалось подписаться на группу ${groupName}. Неизвестная ошибка.`
          );
        }
        return;
      }
      bot.sendMessage(msg.chat.id, `Вы подписались на группу ${groupName}`);
    }
  );

  bot.onText(/Забудь меня/gi, (msg: Message) => {
    const 
  })
}

start();
