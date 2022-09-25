// ordersproducts controller

import OrdersProducts from "../models/ordersProducts";

import { Request, Response } from "express";

const ordersProducts = new OrdersProducts();

async function showOrderProducts(req: Request, res: Response) {
  try {
    const order_id = Number(req.params.order_id);
    const user_id = Number(req.body.token.user_id);
    const orderproduct = await ordersProducts.showOrderProducts(order_id);

    if (!orderproduct.length) throw Error("NO order OR Empty order");

    if (
      req.body.token.role === "admin" ||
      orderproduct[0].user_id === user_id
    ) {
      res.send(orderproduct);
    } else {
      throw Error("you are NOT the admin or owner of order");
    }
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
}

async function addProduct(req: Request, res: Response) {
  try {
    const order_id = Number(req.params.order_id);
    const product_id = Number(req.body.product_id);
    const quantity = Number(req.body.product_id);
    const orderproduct = await ordersProducts.addProduct(
      order_id,
      product_id,
      quantity
    );
    res.send(orderproduct);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
}

export default {
  showOrderProducts,
  addProduct,
};
