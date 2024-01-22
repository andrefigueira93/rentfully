import { calculateFinalPrice } from "./utils";

describe("calculateFinalPrice", () => {
  it("should calculate the final price correctly", () => {
    // Test case 1: All parameters provided
    expect(
      calculateFinalPrice({
        price: 100,
        extraPrice: 10,
        guests: 2,
        totalDays: 3,
      })
    ).toBe(330);

    // Test case 2: Only required parameters provided
    expect(
      calculateFinalPrice({
        price: 50,
        extraPrice: 5,
      })
    ).toBe(55);

    // Test case 3: Missing price parameter
    expect(
      calculateFinalPrice({
        extraPrice: 10,
        guests: 2,
        totalDays: 3,
      })
    ).toBe(NaN);

    // Test case 4: Missing extraPrice parameter
    expect(
      calculateFinalPrice({
        price: 100,
        guests: 2,
        totalDays: 3,
      })
    ).toBe(NaN);
  });
});
