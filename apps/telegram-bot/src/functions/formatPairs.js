import { convertDateToSimpleFormat } from "./convertDateToSimpleFormat";
import { getWeekDayByNumber } from "./getWeekDayByNumber";
export const formatPairs = (pairs) => {
    if (!pairs.length) {
        return null;
    }
    const messages = [];
    const pairsMap = new Map();
    for (const pair of pairs) {
        if (pairsMap.has(getWeekDayByNumber(pair.day))) {
            pairsMap.set(getWeekDayByNumber(pair.day), pairsMap.get(getWeekDayByNumber(pair.day)).concat([pair]));
        }
        else {
            pairsMap.set(getWeekDayByNumber(pair.day), [pair]);
        }
    }
    for (const [day, pairs] of pairsMap) {
        let message = `${day} ${convertDateToSimpleFormat(new Date(pairs[0].date))}:\r\n`;
        for (const pair of pairs) {
            message += `${pair.number} пара 🎯🧑‍🏫 ${pair.name}\r\n`;
        }
        messages.push(message);
    }
    return messages;
};
//# sourceMappingURL=formatPairs.js.map