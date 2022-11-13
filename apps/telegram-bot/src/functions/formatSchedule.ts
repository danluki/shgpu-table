import { Schedule } from "./../models";
export const formatSchedule = (schedule: Schedule[]): string => {
  let formattedSchedule = "";

  for (const sch of schedule) {
    formattedSchedule += `🕗 ${sch.number} пара: ${sch.begint} - ${sch.endt}\r\n`;
  }

  return formattedSchedule;
};
