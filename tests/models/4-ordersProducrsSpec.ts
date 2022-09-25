import OrdersProducts from "../../src/models/ordersProducts";

describe("OrdersProducts Model", () => {
  const ordersProducts = new OrdersProducts();

  it("should have an addProduct method", () => {
    expect(ordersProducts.addProduct).toBeDefined();
  });

  it("should have a show method", () => {
    expect(ordersProducts.showOrderProducts).toBeDefined();
  });

  it("addProduct method should add new product to an order", async () => {
    const result = await ordersProducts.addProduct(2, 1, 30);
    expect(result).toEqual({ id: 2, order_id: 2, product_id: 1, quantity: 30 });
  });

  it("showOrderProducts method should return list of products in the order", async () => {
    const result = await ordersProducts.showOrderProducts(2);
    expect(result).toEqual([
      { product: "lumia950", price: "599", quantity: 30, user_id: 2 },
    ]);
  });
});
