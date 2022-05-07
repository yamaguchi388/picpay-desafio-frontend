import { CustomPaginator } from "./CustomPaginator";

describe("CustomPaginator", () => {
  it("should calculate and return paginator length string", () => {
    const page = 1;
    const pageSize = 10;
    const length = 100;

    const result = CustomPaginator().getRangeLabel(page, pageSize, length);
    expect(result).toEqual(`11 - 20 de ${length}`);
  });
});
