export const ordersQueries = {
  showOrders: "SELECT * FROM orders WHERE user_id = $1",

  showOrder: "SELECT * FROM orders WHERE order_id = ($1)",

  createOrder: "INSERT INTO orders (user_id) VALUES ($1) RETURNING *",
};
