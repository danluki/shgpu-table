import { Pair } from "../../../../libs/shared/src/models/parser.js";
import { FacultyId } from "../parsers/constants.js";

export const getPairAndDayByRow = (
  row: number,
  mondayPairs: Map<number, number>,
  tuesdayPairs: Map<number, number>,
  wednesdayPairs: Map<number, number>,
  thursdayPairs: Map<number, number>,
  fridayPairs: Map<number, number>,
  saturdayPairs: Map<number, number>
): Pair | null => {
  if (mondayPairs.get(row)) {
    return {
      day: 1,
      number: mondayPairs.get(row) as number,
      name: "",
      date: "",
      faculty: { id: FacultyId.UNKNOWN, name: "" },
      groupName: "",
    };
  }
  if (tuesdayPairs.get(row)) {
    return {
      day: 2,
      number: tuesdayPairs.get(row) as number,
      name: "",
      date: "",
      faculty: { id: FacultyId.UNKNOWN, name: "" },
      groupName: "",
    };
  }
  if (wednesdayPairs.get(row)) {
    return {
      day: 3,
      number: wednesdayPairs.get(row) as number,
      name: "",
      date: "",
      faculty: { id: FacultyId.UNKNOWN, name: "" },
      groupName: "",
    };
  }
  if (thursdayPairs.get(row)) {
    return {
      day: 4,
      number: thursdayPairs.get(row) as number,
      name: "",
      date: "",
      faculty: { id: FacultyId.UNKNOWN, name: "" },
      groupName: "",
    };
  }
  if (fridayPairs.get(row)) {
    return {
      day: 5,
      number: fridayPairs.get(row) as number,
      name: "",
      date: "",
      faculty: { id: FacultyId.UNKNOWN, name: "" },
      groupName: "",
    };
  }
  if (saturdayPairs.get(row)) {
    return {
      day: 6,
      number: saturdayPairs.get(row) as number,
      name: "",
      date: "",
      faculty: { id: FacultyId.UNKNOWN, name: "" },
      groupName: "",
    };
  }
  return null
};
