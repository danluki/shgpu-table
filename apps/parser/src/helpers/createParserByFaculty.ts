import { ItienParser } from "../parsers/itienParser";
import { Parser } from "../parsers/parser";

export const createParserByFaculty = (
  facultyId: number,
): Parser | null => {
  switch (facultyId) {
    // case 12:
    //   return new GymParser(path);
    // case 8:
    //   return new PsychoParser(path);
    case 11:
      return new ItienParser();
    // case 3:
    //   return new PeParser(path);
    // case 15:
    //   return new CollegeParser(path);
    // default:
    //   return null;
  }
};
