import { ordersProductsQueries } from "./sql/ordersProducts";
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
      const orderProduct = await pg_query(ordersProductsQueries.addProduct, [
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
      const orderProduct = await pg_query(
        ordersProductsQueries.showOrderProducts,
        [order_id]
      );
      return orderProduct.rows;
    } catch (error) {
      throw Error(`Could NOT Show Order's Product. ERROR:${error}`);
    }
  }
}
