import { decrypt, encrypt } from ".";

describe("Crypto", () => {
  it("should correctly encrypt data", () => {
    const encryptData = encrypt("unit-test");
    expect(encryptData).toBe("dW5pdC10ZXN0");
  });

  it("should correctly decrypt data", () => {
    const decryptData = decrypt("dW5pdC10ZXN0");
    expect(decryptData).toBe("unit-test");
  });
});
