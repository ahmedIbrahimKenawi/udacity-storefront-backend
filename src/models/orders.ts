import { pg_query } from "./_database/pg_query";

export interface Order {
  order_id: number;
  user_id: number;
  status: string;
}

export default class Orders {
  async showOrders(user_id: number) {
    try {
      const sql = "SELECT * FROM orders WHERE user_id = $1";
      const result = await pg_query(sql, [user_id]);
      const myOrders = result.rows;
      return myOrders;
    } catch (error) {
      throw Error(`Could NOT select all Orders. ERROR ${error}`);
    }
  }

  async showOrder(order_id: number): Promise<Order> {
    try {
      const sql = "SELECT * FROM orders WHERE order_id = ($1)";
      const result = await pg_query(sql, [order_id]);
      const orders = result.rows[0];
      return orders;
    } catch (error) {
      throw Error(`Could NOT get Order:${order_id}. ERROR ${error}`);
    }
  }

  async createOrder(user_id: number) {
    try {
      const sql = "INSERT INTO orders (user_id) VALUES ($1) RETURNING *";
      const result = await pg_query(sql, [user_id]);
      const orders = result.rows;
      return orders;
    } catch (error) {
      throw Error(`Could NOT select all Orders. ERROR ${error}`);
    }
  }
}
