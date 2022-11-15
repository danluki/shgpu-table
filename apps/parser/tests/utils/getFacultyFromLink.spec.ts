import { getFacultyFromLink } from "./../../src/utils/getFacultyFromLink";

const validLink =
  "http://shgpi.edu.ru/struktura-universiteta/f12/raspisanie/raspisanie-ochnogo-otdelenija/";

test("Getting faculty valid", () => {
  expect(getFacultyFromLink().toBe(12));
});
