import { Application } from "express";

import productsRoutes from "./products";
import usersRoutes from "./users";
import ordersRoutes from "./orders";

export default function routes(app: Application) {
  usersRoutes(app);
  productsRoutes(app);
  ordersRoutes(app);
}
