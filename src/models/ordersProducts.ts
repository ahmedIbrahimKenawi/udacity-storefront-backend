import { pg_query } from "./_database/pg_query";

export interface OrdersProduct {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  user_id: number;
}

export interface showOrderProduct {
  user_id: number;
  price: string;
  product: string;
  quantity: number;
}

export default class OrdersProducts {
  async addProduct(order_id: number, product_id: number, quantity: number) {
    try {
      const sql = `
      INSERT INTO order_products (order_id, product_id, quantity)
      VALUES ($1, $2, $3) RETURNING *`;
      const orderProduct = await pg_query(sql, [
        order_id,
        product_id,
        quantity,
      ]);
      return orderProduct.rows[0];
    } catch (error) {
      throw Error(`Could NOT Add Products. ERROR:${error}`);
    }
  }

  async showOrderProducts(order_id: number): Promise<showOrderProduct[]> {
    try {
      const sql = `
      SELECT
        products.name AS product,
        products.price AS price,
        order_products.quantity AS quantity,
        user_id
      FROM order_products
      JOIN products USING (product_id)
      JOIN orders USING (order_id)
      WHERE order_id = $1;
      `;
      const orderProduct = await pg_query(sql, [order_id]);
      return orderProduct.rows;
    } catch (error) {
      throw Error(`Could NOT Show Order's Product. ERROR:${error}`);
    }
  }
}
