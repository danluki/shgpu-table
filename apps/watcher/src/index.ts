import "dotenv/config";
import { createPubsub } from "@shgpu-table/pubsub/src/index";
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
import { Faculty } from "./types";

export const faculties: Faculty[] = [
  {
    id: 12,
    name: "Гуманитарный институт",
    link: "https://shgpi.edu.ru/struktura-universiteta/f12/raspisanie/raspisanie-ochnogo-otdelenija/",
  },
  {
    id: 8,
    name: "Институт психологии и педагогики",
    link: "https://shgpi.edu.ru/struktura-universiteta/f08/raspisanie/raspisanie-ochnogo-otdelenie-fpo/",
  },
  {
    id: 11,
    name: "Институт информационных технологий,точных и естественных наук",
    link: "https://shgpi.edu.ru/struktura-universiteta/f11/raspisanie/raspisanie-uchebnykh-zanjatii-ochnaja-forma-obuchenija/",
  },
  {
    id: 3,
    name: "Факультет физической культуры",
    link: "https://shgpi.edu.ru/struktura-universiteta/f03/raspisanie/raspisanie-ochnogo-otdelenija-ffk/",
  },
  {
    id: 15,
    name: "Университетский колледж",
    link: "https://shgpi.edu.ru/struktura-universiteta/f15/raspisanie/ochnaja-forma-obuchenija/",
  },
];

async function start() {
  const pubsub = await createPubsub(process.env.REDIS_URL);
  const channel = createChannel(`localhost:${PORTS}`);
  const parserClient: ParserClient = createClient(ParserDefinition, channel);
  const watcher = new Watcher(parserClient, faculties, "* * * * *");
  channel.close();
}

start();
