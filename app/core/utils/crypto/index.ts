export const encrypt = (value: string) =>
  Buffer.from(value, "utf-8").toString("base64");

export const decrypt = (value: string) =>
  Buffer.from(value, "base64").toString("utf-8");
