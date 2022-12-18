import { Pair } from "../../../../libs/models/parser";
import { FacultiesIds } from "../constants/faculties";
import { FacultyId } from "../parsers/constants";

export const getPairAndDayByRow = (
  row: number,
  mondayPairs: Map<number, number>,
  tuesdayPairs: Map<number, number>,
  wednesdayPairs: Map<number, number>,
  thursdayPairs: Map<number, number>,
  fridayPairs: Map<number, number>,
  saturdayPairs: Map<number, number>
): Pair => {
  if (mondayPairs.get(row)) {
    return {
      day: 1,
      number: mondayPairs.get(row),
      name: "",
      date: null,
      faculty: FacultyId.UNKNOWN,
      groupName: "",
    };
  }
  if (tuesdayPairs.get(row)) {
    return {
      day: 2,
      number: tuesdayPairs.get(row),
      name: "",
      date: null,
      faculty: FacultyId.UNKNOWN,
      groupName: "",
    };
  }
  if (wednesdayPairs.get(row)) {
    return {
      day: 3,
      number: wednesdayPairs.get(row),
      name: "",
      date: null,
      faculty: FacultyId.UNKNOWN,
      groupName: "",
    };
  }
  if (thursdayPairs.get(row)) {
    return {
      day: 4,
      number: thursdayPairs.get(row),
      name: "",
      date: null,
      faculty: FacultyId.UNKNOWN,
      groupName: "",
    };
  }
  if (fridayPairs.get(row)) {
    return {
      day: 5,
      number: fridayPairs.get(row),
      name: "",
      date: null,
      faculty: FacultyId.UNKNOWN,
      groupName: "",
    };
  }
  if (saturdayPairs.get(row)) {
    return {
      day: 6,
      number: saturdayPairs.get(row),
      name: "",
      date: null,
      faculty: FacultyId.UNKNOWN,
      groupName: "",
    };
  }

  return null;
};
