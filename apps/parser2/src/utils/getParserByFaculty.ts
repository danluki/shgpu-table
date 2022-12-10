import { UnknownFacultyError } from "../exceptions/UnknownFacultyError";
import { CollegeParser } from "../parsers/CollegeParser";
import { GymParser } from "../parsers/GymParser";
import { ItienParser } from "../parsers/ItienParser";
import { PeParser } from "../parsers/PeParser";
import { PsychoParser } from "../parsers/PsychoParser";
import { TableParser } from "../parsers/TableParser";

export const getParserByFaculty = (
  facultyId: number,
  path: string
): TableParser | null => {
  switch (facultyId) {
    case 12:
      return new GymParser(path);
    case 8:
      return new PsychoParser(path);
    case 11:
      return new ItienParser(path);
    case 3:
      return new PeParser(path);
    case 15:
      return new CollegeParser(path);
    default:
      return null;
  }
};
