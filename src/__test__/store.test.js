import { Store, DiscountOffer } from "./../main/store";

describe("Store", () => {
  it("should decrease the discount and expiresIn", () => {
    expect(new Store([new DiscountOffer("test", 2, 3)]).updateDiscounts()).toEqual(
      [new DiscountOffer("test", 1, 2)]
    );
  });
});
