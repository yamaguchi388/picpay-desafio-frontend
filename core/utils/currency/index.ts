type CurrencyOptions = {
  prefix: string;
  suffix: string;
  length: number;
  separator: string;
  delimiter: string;
};

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
