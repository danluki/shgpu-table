import { faculties } from "../constraints/faculties";
import { UnknownFacultyError } from "../exceptions/UnknownFacultyError";
import { UnknownPathError } from "../exceptions/UnknownPathError";
import { Faculty } from "../models/models";

export const getFacultyFromLink = (link: string): Faculty => {
  const facultyId = Number(link?.match(new RegExp(/\d+/i))?.shift());
  if (!facultyId) throw new UnknownPathError(link);

  const faculty = faculties.find((faculty) => faculty.id === facultyId);
  if (!faculty) throw new UnknownFacultyError(facultyId);
  return faculty;
};
