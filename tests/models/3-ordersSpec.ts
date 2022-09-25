import Orders from "../../src/models/orders";

describe("Orders Model", () => {
  const ordersModel = new Orders();

  it("should have an index method", () => {
    expect(ordersModel.createOrder).toBeDefined();
  });

  it("should have a show method", () => {
    expect(ordersModel.showOrder).toBeDefined();
  });

  it("should have a create method", () => {
    expect(ordersModel.showOrders).toBeDefined();
  });

  it("createOrder by user id method should return an active order", async () => {
    const result = await ordersModel.createOrder(2);
    expect(result).toEqual([{ order_id: 2, user_id: 2, status: "active" }]);
  });

  it("showOrders method should return by user id", async () => {
    const result = await ordersModel.showOrders(2);
    expect(result).toEqual([
      { order_id: 1, user_id: 2, status: "active" },
      { order_id: 2, user_id: 2, status: "active" },
    ]);
  });

  it("showOrder by order_id method should return by user id", async () => {
    const result = await ordersModel.showOrder(1);
    expect(result).toEqual({ order_id: 1, user_id: 2, status: "active" });
  });
});
