import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/pt-br";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");
dayjs.extend(utc);
dayjs.extend(customParseFormat);

export const formatDateBR = (rawDate: string, showTime?: boolean) => {
  if (!rawDate) {
    return rawDate;
  }

  if (showTime) {
    return dayjs(rawDate).format("DD/MM/YYYY HH[h]mm");
  }
  return dayjs(rawDate).format("DD/MM/YYYY");
};
