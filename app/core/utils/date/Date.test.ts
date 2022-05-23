import { formatDateBR, formatDate } from ".";

describe("date", () => {
  it("should correctly format date BR", () => {
    const formatedValue = formatDateBR("2022-05-22");

    expect(formatedValue).toBe("22/05/2022");
  });

  it("should correctly format date ISO", () => {
    const formatedValue = formatDate("2022-05-22T23:48:19.925Z");

    expect(formatedValue).toBe("2022-05-22");
  });

  it("should correctly format date BR with show time", () => {
    const formatedValue = formatDateBR("2022-05-22T23:48:19.925Z", true);

    expect(formatedValue).toBe("22/05/2022 - 20h48");
  });

  it("should correctly return without raw date", () => {
    const formatedValue = formatDateBR("");

    expect(formatedValue).toBe("");
  });
});
