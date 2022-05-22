import { CurrencyOptions } from "./types";

export const currency = (value: number, options = {}): string => {
  if (typeof options !== "object") {
    throw new Error("Invalid options for currency fn");
  }

  const {
    prefix = "R$ ",
    suffix = "",
    length = 2,
    separator = ".",
    delimiter = ",",
  } = options as CurrencyOptions;

  const re = `\\d(?=(\\d{3})+${length > 0 ? "\\D" : "$"})`;
  const number = Number(value).toFixed(Math.max(0, length));

  return (
    prefix +
    (delimiter ? number.replace(".", delimiter) : number).replace(
      new RegExp(re, "g"),
      `$&${separator || ","}`
    ) +
    suffix
  );
};

export const replaceCurrency = (money: string): string => {
  if (!money) return "";
  const moneyLength = money.replace(/,/g, ".").substr(2).length;
  const moneyReplaced =
    moneyLength > 7
      ? money.replace(/,/g, ".").substring(2).replace(".", "")
      : money.replace(/,/g, ".").substring(2);

  return moneyReplaced;
};
