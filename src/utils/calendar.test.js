import { splitDateString } from "./calendar";

describe("splitDateString", () => {
  it("should return an empty array when no string is given", () => {
    expect(splitDateString()).toMatchObject([]);
  });
});
