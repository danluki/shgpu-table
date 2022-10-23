import { Pair } from "../models/models";
import {
  mondayPairs,
  tuesdayPairs,
  wednesdayPairs,
  thursdayPairs,
  fridayPairs,
  saturdayPairs,
} from "../constraints/itienTable";

export const getPairAndDayByRow = (row: number): Pair => {
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
