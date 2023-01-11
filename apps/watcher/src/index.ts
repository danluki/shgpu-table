import "dotenv/config";
import { createPubsub } from "../../../libs/pubsub/src/index";
import { PORTS } from "../../../libs/grpc/servers/constants";

import {
  CheckLocalTableModifyDateRequest,
  CheckLocalTableModifyDateResponse,
  DeepPartial,
  ParserClient,
  ParserDefinition,
} from "../../../libs/grpc/generated/parser/parser";
import { createChannel, createClient } from "nice-grpc";
import { Watcher } from "./watcher";

export const faculties: any[] = [
  // {
  //   id: 12,
  //   name: "Гуманитарный институт",
  //   link: "https://shgpi.edu.ru/struktura-universiteta/f12/raspisanie/raspisanie-ochnogo-otdelenija/",
  // },
  // {
  //   id: 8,
  //   name: "Институт психологии и педагогики",
  //   link: "https://shgpi.edu.ru/struktura-universiteta/f08/raspisanie/raspisanie-ochnogo-otdelenie-fpo/",
  // },
  {
    id: 11,
    name: "Институт информационных технологий,точных и естественных наук",
    link: "https://shgpi.edu.ru/struktura-universiteta/f11/raspisanie/raspisanie-uchebnykh-zanjatii-ochnaja-forma-obuchenija/",
  },
  // {
  //   id: 3,
  //   name: "Факультет физической культуры",
  //   link: "https://shgpi.edu.ru/struktura-universiteta/f03/raspisanie/raspisanie-ochnogo-otdelenija-ffk/",
  // },
  // {
  //   id: 15,
  //   name: "Университетский колледж",
  //   link: "https://shgpi.edu.ru/struktura-universiteta/f15/raspisanie/ochnaja-forma-obuchenija/",
  // },
];

async function start() {
  const pubsub = await createPubsub(process.env.REDIS_URL);
  // let i = 0;
  // setInterval(() => {
  //   console.log(i);
  //   pubsub.publish("tables.new", `${i++}`);
  // }, 1000);
  // setInterval(() => {
  //   // console.log(i);
  //   pubsub.publish(
  //     "tables.new",
  //     `{"facultyId":11,"isNew":false,"isUpdated":false,"weekBegin":"2022-12-26T00:00:00.000Z","weekEnd":"2023-01-01T00:00:00.000Z","link":"https://shgpi.edu.ru/fileadmin/rasp/faculty/f11/26_12_2022_01_01_2023/26_12_2022_01_01_2023.xls"}`
  //   );
  // }, 5000);
  setInterval(() => {
    for (let i = 0; i < 15; i++) {
      pubsub.publish("tables.new", {
        facultyId: 11,
        isNew: true,
        isUpdated: false,
        weekBegin: "2022-12-09T00:00:00.000Z",
        weekEnd: "2023-01-15T00:00:00.000Z",
        link: "idi",
      });
    }
  }, 2000);
  // const channel = createChannel(`127.0.0.1:${PORTS.PARSER_SERVER_PORT}`);
  // const parserClient: ParserClient = createClient(ParserDefinition, channel);
  // const watcher = new Watcher(parserClient, faculties, "* * * * *", pubsub);
  // watcher.start();
  //channel.close();
}

start();
