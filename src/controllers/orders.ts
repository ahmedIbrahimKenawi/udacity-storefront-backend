// orders controller

import { Request, Response } from "express";
import Orders from "../models/orders";
import { parseToken, getToken } from "./utils/token";

const orders = new Orders();

async function indexOrders(req: Request, res: Response) {
  try {
    const currentUser = Number(parseToken(getToken(req)).user_id);
    const user_id = Number(req.params.user_id);
    if (parseToken(getToken(req)).role === "admin" || currentUser === user_id) {
      const myOrders = await orders.showOrders(user_id);
      res.send(myOrders);
    } else {
      throw Error("permission denied");
    }
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
}

async function showOrder(req: Request, res: Response) {
  try {
    const order_id = Number(req.params.order_id);
    const order = await orders.showOrder(order_id);
    if (!order) {
      throw Error("Wrong order ID");
    }
    if (
      parseToken(getToken(req)).role === "admin" ||
      parseToken(getToken(req)).user_id === order.user_id
    ) {
      res.send(order);
    } else {
      throw Error("not the owner of Order");
    }
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
}

async function createOrder(req: Request, res: Response) {
  try {
    const user_id = Number(parseToken(getToken(req)).user_id);
    const newOrder = await orders.createOrder(user_id);
    res.send(newOrder);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
}

export default {
  indexOrders,
  showOrder,
  createOrder,
};
