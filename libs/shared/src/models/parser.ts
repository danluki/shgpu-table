export type Pair = {
  day: number;
  number: number;
  name: string;
  date: string;
  groupName: string;
  faculty: {
    id: number;
    name: string;
  };
};

export type Week = {
  beginDate: Date;
  endDate: Date;
};

export type Faculty = {
  id: number;
  name: string;
  link: string;
};

export interface TableInfo {
  facultyId: FacultyId;
  isNew: boolean;
  isModified: boolean;
  weekBegin: Date;
  weekEnd: Date;
  link: string;
}

export enum FacultyId {
  UNKNOWN = 0,
  GYM = 12,
  PSYCHO = 8,
  ITIEN = 11,
  PE = 3,
  COLLEGE = 15,
}
