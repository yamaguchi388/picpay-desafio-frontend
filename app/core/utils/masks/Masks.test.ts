import { masks } from ".";

describe("Masks", () => {
  it("should correctly value with mask", () => {
    const maskedValue = masks.currency("12345");

    expect(maskedValue).toBe("R$ 123,45");
  });
});
