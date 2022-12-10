import { UnknownFacultyError } from "../../exceptions/UnknownFacultyError";
import { getFacultyFromLink } from "../../utils/getFacultyFromLink";

describe("Getting faculty from link tests", () => {
  const validLink =
    "https://shgpi.edu.ru/struktura-universiteta/f08/raspisanie/raspisanie-ochnogo-otdelenie-fpo/";
  const invalidLink = "https://999shgpi.edu/f/";

  test("Successfully getting faculty from link", () => {
    expect(getFacultyFromLink(validLink).id).toBe(8);
  });

  test("Error getting faculty from link", () => {
    expect(() => getFacultyFromLink(invalidLink)).toThrow(UnknownFacultyError);
  });
});
