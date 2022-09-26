export const ordersProductsQueries = {
  addProduct: `
      INSERT INTO order_products (order_id, product_id, quantity)
      VALUES ($1, $2, $3) RETURNING *`,

  showOrderProducts: `
      SELECT
        products.name AS product,
        products.price AS price,
        order_products.quantity AS quantity,
        user_id
      FROM order_products
      JOIN products USING (product_id)
      JOIN orders USING (order_id)
      WHERE order_id = $1;`,
};
