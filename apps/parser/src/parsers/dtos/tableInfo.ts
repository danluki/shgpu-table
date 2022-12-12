import { FacultyId } from "../constants";

export interface TableInfo {
  facultyId: FacultyId;
  isNew: boolean;
  isModified: boolean;
  weekBegin: Date;
  weekEnd: Date;
}
