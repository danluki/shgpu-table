import { format } from "date-fns";
import { ru } from "date-fns/locale";

export const convertDateToSimpleFormat = (date: Date): string => {
  console.log(typeof date);
  return format(date, "dd MMMM", {
    locale: ru,
  });
};
