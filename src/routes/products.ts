import { verifyAuthority } from "../middleWare/verifyAuthority";
import { Application, Router } from "express";
import productController from "../controllers/products";
import { varifyParameters } from "../middleWare/varifyParameters";

export default function productsRoutes(app: Application) {
  const products = Router();

  products
    .route("/")

    // create product
    .post(verifyAuthority(["admin"]), productController.createProduct)

    // show All product
    .get(productController.index)

    // update Product price
    .put(
      verifyAuthority(["admin"]),
      varifyParameters(["name", "price"]),
      productController.changePrice
    )

    // delete Product
    .delete(
      verifyAuthority(["admin"]),
      varifyParameters(["name"]),
      productController.deleteProduct
    );

  // show  Product
  products.get("/:product", productController.showProduct);

  // show Category
  products.get("/category/:categoryName", productController.productsByCategory);

  app.use("/products", products);
}
