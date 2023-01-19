import { FacultiesIds } from "../constants/faculties";
import { UnknownFacultyError } from "../errors/unkownFacultyError";
import { Parser } from "../parsers/parser";

export const createParserByFaculty = (facultyId: number): Parser | null => {
  switch (facultyId) {
    // case 12:
    //   return new GymParser(path);
    // case 8:
    //   return new PsychoParser(path);
    case FacultiesIds.ITIEN:
      return null;
    // case 3:
    //   return new PeParser(path);
    // case 15:
    //   return new CollegeParser(path);
    default:
      throw new UnknownFacultyError(facultyId);
  }
};
