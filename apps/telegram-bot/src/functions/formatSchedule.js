export const formatSchedule = (schedule) => {
    let formattedSchedule = "";
    for (const sch of schedule) {
        formattedSchedule += `🕗 ${sch.number} пара: ${sch.begint} - ${sch.endt}\r\n`;
    }
    return formattedSchedule;
};
//# sourceMappingURL=formatSchedule.js.map