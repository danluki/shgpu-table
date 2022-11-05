import "dotenv/config";
import TelegramBot, { Message, KeyboardButton } from "node-telegram-bot-api";
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

  bot.onText(/Подпиши на группу/, (msg: Message) => {
    bot.sendMessage(msg.chat.id, "Введите название группы");

    bot.onText(/.+/, (msg: Message) => {
      console.log(msg.text);
    });
  });
}

start();
