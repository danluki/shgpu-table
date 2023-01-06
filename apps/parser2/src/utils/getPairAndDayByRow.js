export const getPairAndDayByRow = (row, mondayPairs, tuesdayPairs, wednesdayPairs, thursdayPairs, fridayPairs, saturdayPairs) => {
    if (mondayPairs.get(row)) {
        return {
            day: 1,
            number: mondayPairs.get(row),
            name: "",
            date: null,
        };
    }
    if (tuesdayPairs.get(row)) {
        return {
            day: 2,
            number: tuesdayPairs.get(row),
            name: "",
            date: null,
        };
    }
    if (wednesdayPairs.get(row)) {
        return {
            day: 3,
            number: wednesdayPairs.get(row),
            name: "",
            date: null,
        };
    }
    if (thursdayPairs.get(row)) {
        return {
            day: 4,
            number: thursdayPairs.get(row),
            name: "",
            date: null,
        };
    }
    if (fridayPairs.get(row)) {
        return {
            day: 5,
            number: fridayPairs.get(row),
            name: "",
            date: null,
        };
    }
    if (saturdayPairs.get(row)) {
        return {
            day: 6,
            number: saturdayPairs.get(row),
            name: "",
            date: null,
        };
    }
    return null;
};
//# sourceMappingURL=getPairAndDayByRow.js.map