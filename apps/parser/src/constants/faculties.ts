import { Faculty } from "../../../../libs/models/parser";

export const faculties: Faculty[] = [
  { id: 12, name: "Гуманитарный институт" },
  { id: 8, name: "Институт психологии и педагогики" },
  {
    id: 11,
    name: "Институт информационных технологий,точных и естественных наук",
  },
  { id: 3, name: "Факультет физической культуры" },
  { id: 15, name: "Университетский колледж" },
];

export enum FacultiesIds {
  GYM = 12,
  PSYCHO = 8,
  ITIEN = 11,
  PE = 3,
  COLLEGE = 15,
}
