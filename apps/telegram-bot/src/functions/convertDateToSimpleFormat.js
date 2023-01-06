import { format } from "date-fns";
import { ru } from "date-fns/locale";
export const convertDateToSimpleFormat = (date) => {
    return format(date, "dd MMMM", {
        locale: ru,
    });
};
//# sourceMappingURL=convertDateToSimpleFormat.js.map