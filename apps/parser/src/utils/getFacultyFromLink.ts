import { faculties } from "../constraints/faculties";
import { Faculty } from "../models/models";

export const getFacultyFromLink = (link: string): Faculty | null => {
  const regexp = new RegExp(/\d+/i);
  const facultyId = Number(link.match(regexp).shift());
  if (!facultyId) return null;

  return faculties.find((f) => f.id === facultyId);
};
