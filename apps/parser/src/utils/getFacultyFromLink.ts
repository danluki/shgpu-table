import { UnknownFacultyError } from "./../exceptions/UnknownFacultyError";
import { faculties } from "../constraints/faculties";
import { Faculty } from "../models/models";
import { GetFacultyFromLinkError } from "../exceptions/GetFacultyFromLinkError";

export const getFacultyFromLink = (link: string): Faculty => {
  const regexp = new RegExp(/\d+/i);
  const facultyId = Number(link.match(regexp)?.shift());
  if (!facultyId) throw new GetFacultyFromLinkError();

  const id = faculties.find((f) => f.id === facultyId);
  if (!id) throw new UnknownFacultyError(facultyId);

  return id;
};
