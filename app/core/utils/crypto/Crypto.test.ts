import { decrypt, encrypt } from ".";

describe("Crypto", () => {
  it("should correctly encrypt data", () => {
    const encryptData = encrypt("test-unit");
    expect(encryptData).toBe("dGVzdC11bml0");
  });

  it("should correctly decrypt data", () => {
    const decryptData = decrypt("dGVzdC11bml0");
    expect(decryptData).toBe("test-unit");
  });
});
