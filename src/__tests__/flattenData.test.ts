import { flattenData } from "../shared/utils";
import { mockData } from "./mockData.ts";

describe("Test flattenData function", () => {
  it("should content 3 items", () => {
    const data = flattenData(mockData);
    expect(data).toHaveLength(3);
  });
});
