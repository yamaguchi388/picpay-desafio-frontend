import * as mask from ".";

describe("currency", () => {
  it("should correctly mask value", () => {
    const formatValue = mask.currency(123);

    expect(formatValue).toBe("R$ 123,00");
  });

  it("should correctly throw error mask value", () => {
    expect(() => mask.currency(123, "{}")).toThrowError();
  });

  it("should correctly replace mask value", () => {
    const replaceValue = +mask.replaceCurrency("R$ 123,00");

    expect(replaceValue).toBe(123);
  });

  it("should correctly throw error replace mask value", () => {
    const replaceValue = mask.replaceCurrency("");
    expect(replaceValue).toBe("");
  });

  it("should correctly replace mask value with value.length more 7", () => {
    const replaceValue = +mask.replaceCurrency("R$ 1231.123,00");
    expect(replaceValue).toBe(1231123);
  });
});
