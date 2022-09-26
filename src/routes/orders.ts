import { Application, Router } from "express";
import { verifyAuthority } from "../middleWare/verifyAuthority";
import ordersController from "../controllers/orders";
import ordersProductsController from "../controllers/ordersProducts";

export default function ordersRoutes(app: Application) {
  const orders = Router();

  orders.use(verifyAuthority(["admin", "user"]));

  orders.get("/:user_id", ordersController.indexOrders);

  orders.post("/", ordersController.createOrder);

  orders.get("/order_id/:order_id(\\d+)", ordersController.showOrder);

  orders.post(
    "/order_id/:order_id(\\d+)/addproduct",
    ordersProductsController.addProduct
  );

  orders.get(
    "/order_id/:order_id(\\d+)/products",
    ordersProductsController.showOrderProducts
  );

  // mount
  app.use("/orders", orders);
}
