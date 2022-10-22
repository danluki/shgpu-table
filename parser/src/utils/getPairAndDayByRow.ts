import {
  mondayPairs,
  tuesdayPairs,
  wednesdayPairs,
  thursdayPairs,
  fridayPairs,
  saturdayPairs,
} from "../constraints/itienTable";

export const getPairAndDayByRow = (row: number) => {
  let res = {};
  if (mondayPairs.get(row)) {
    return {
      day: "monday",
      pair: mondayPairs.get(row),
      name: "",
      instructor: "",
    };
  }
  if (tuesdayPairs.get(row)) {
    return {
      day: "tuesday",
      pair: tuesdayPairs.get(row),
      name: "",
      instructor: "",
    };
  }
  if (wednesdayPairs.get(row)) {
    return {
      day: "wednesday",
      pair: wednesdayPairs.get(row),
      name: "",
      instructor: "",
    };
  }
  if (thursdayPairs.get(row)) {
    return {
      day: "thursday",
      pair: thursdayPairs.get(row),
      name: "",
      instructor: "",
    };
  }
  if (fridayPairs.get(row)) {
    return {
      day: "friday",
      pair: fridayPairs.get(row),
      name: "",
      instructor: "",
    };
  }
  if (saturdayPairs.get(row)) {
    return {
      day: "saturday",
      pair: saturdayPairs.get(row),
      name: "",
      instructor: "",
    };
  }

  return null;
};
