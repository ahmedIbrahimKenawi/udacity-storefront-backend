import { verifyAuthority } from "../middleWare/verifyAuthority";
import { Application, Router } from "express";
import userController from "../controllers/users";

export default function usersRoutes(app: Application) {
  const users = Router();

  // login
  users.post("/login", userController.login);

  // signup
  users.post("/signup", userController.create);

  // index
  users.get("/", verifyAuthority(["admin"]), userController.index);

  // show
  users.get("/id/:id(\\d+)", verifyAuthority(["admin"]), userController.show);

  app.use("/users", users);
}
