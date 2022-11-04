import { Pair } from "../models/models";

export const getPairAndDayByRow = (
  row: number,
  mondayPairs: Map<number, number>,
  tuesdayPairs: Map<number, number>,
  wednesdayPairs: Map<number, number>,
  thursdayPairs: Map<number, number>,
  fridayPairs: Map<number, number>,
  saturdayPairs: Map<number, number>,
): Pair => {
  if (mondayPairs.get(row)) {
    return {
      day: 1,
      number: mondayPairs.get(row),
      name: "",
      instructor: "",
      date: null,
    };
  }
  if (tuesdayPairs.get(row)) {
    return {
      day: 2,
      number: tuesdayPairs.get(row),
      name: "",
      instructor: "",
      date: null,
    };
  }
  if (wednesdayPairs.get(row)) {
    return {
      day: 3,
      number: wednesdayPairs.get(row),
      name: "",
      instructor: "",
      date: null,
    };
  }
  if (thursdayPairs.get(row)) {
    return {
      day: 4,
      number: thursdayPairs.get(row),
      name: "",
      instructor: "",
      date: null,
    };
  }
  if (fridayPairs.get(row)) {
    return {
      day: 5,
      number: fridayPairs.get(row),
      name: "",
      instructor: "",
      date: null,
    };
  }
  if (saturdayPairs.get(row)) {
    return {
      day: 6,
      number: saturdayPairs.get(row),
      name: "",
      instructor: "",
      date: null,
    };
  }

  return null;
};
