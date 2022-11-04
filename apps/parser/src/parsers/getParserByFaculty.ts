import { CollegeParser } from "./CollegeParser";
import { GymParser } from "./GymParser";
import { ItienParser } from "./ItienParser";
import { PeParser } from "./PeParser";
import { PsychoParser } from "./PsychoParser";
import { TableParser } from "./TableParser";

export const getParserByFaculty = (facultyId: number, path: string): TableParser | null => {
  switch (facultyId) {
    case 12:
      return new GymParser(
        path
      );
    case 8:
      return new PsychoParser(
        path
      );
    case 11:
      return new ItienParser(
        path
      );
    case 3:
      return new PeParser(
        path
      );
    case 15:
      return new CollegeParser(
        path
      );
    default:
      return null;
  }
};
