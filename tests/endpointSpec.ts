import app from "../src/app";
import supertest from "supertest";

import * as jwt from "jsonwebtoken";

const request = supertest(app);

import {
  TOKEN_SECRET,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  ADMIN_FIRST_NAME,
  ADMIN_LAST_NAME,
} from "../src/config";

let admin_token: string;
let user_token: string;

describe("Test endpoint /users", () => {
  it("[POST] /users/login", async () => {
    const response = await request.post("/users/login").send({
      first_name: ADMIN_FIRST_NAME,
      last_name: ADMIN_LAST_NAME,
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    });

    expect(response.status).toEqual(200);

    admin_token = response.body.token;
    expect(
      jwt.verify(admin_token as string, TOKEN_SECRET as string)
    ).toBeTruthy();
  });

  it("[POST] /users/signup", async () => {
    const response = await request.post("/users/signup").send({
      first_name: "ahmed",
      last_name: "ibrahim",
      email: "ahmed@mail.com",
      password: "456",
    });

    expect(response.status).toEqual(200);

    user_token = response.body.token;
    expect(
      jwt.verify(user_token as string, TOKEN_SECRET as string)
    ).toBeTruthy();
  });

  it("[GET] /users", async () => {
    const response = await request
      .get("/users")
      .auth(admin_token, { type: "bearer" });

    expect(response.status).toEqual(200);
    expect(response.body.length).toBe(2);
  });

  it("[GET] /users/id/2", async () => {
    const response = await request
      .get("/users/id/2")
      .auth(admin_token, { type: "bearer" });

    expect(response.status).toEqual(200);
    expect(response.body.role).toBe("user");
  });
});

describe("Test endpoint /products", () => {
  it("[get] /products", async () => {
    const response = await request.get("/products").send();
    expect(response.status).toEqual(200);
  });

  it("[post] /products", async () => {
    const response = await request
      .post("/products")
      .send({ name: "lumia950", price: 799, category: "electronics" })
      .auth(admin_token, { type: "bearer" });

    expect(response.status).toEqual(200);
  });

  it("[post] /products", async () => {
    const response = await request
      .post("/products")
      .send({ name: "hummer", price: 7.9, category: "tools" })
      .auth(admin_token, { type: "bearer" });

    expect(response.status).toEqual(200);
  });

  it("[put] /products", async () => {
    const response = await request
      .put("/products")
      .send({ name: "lumia950", price: 599 })
      .auth(admin_token, { type: "bearer" });

    expect(response.status).toEqual(200);
    expect(response.body.price).toEqual("599");
  });

  it("[get] /products/category/:category = electronics", async () => {
    const response = await request.get("/products/category/electronics");

    expect(response.status).toEqual(200);
    expect(response.body[0].product).toEqual("lumia950");
  });

  it("[get] /products/:product = lumia950", async () => {
    const response = await request.get("/products/lumia950");

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      product_id: 1,
      product: "lumia950",
      price: "599",
      category: "electronics",
    });
  });

  it("[delete] /products", async () => {
    const response = await request
      .delete("/products")
      .send({ name: "hummer" })
      .auth(admin_token, { type: "bearer" });

    expect(response.status).toEqual(200);
  });
});

describe("Test endpoint /orders", () => {
  it("[post] /orders", async () => {
    const response = await request
      .post("/orders")
      .auth(user_token, { type: "bearer" });

    expect(response.status).toBe(200);
    expect(response.body[0]).toEqual({
      order_id: 1,
      user_id: 2,
      status: "active",
    });
  });

  it("[get] /orders/:user_id = 2", async () => {
    const response = await request
      .get("/orders/2")
      .auth(user_token, { type: "bearer" });

    expect(response.status).toEqual(200);
    expect(response.body[0]).toEqual({
      order_id: 1,
      user_id: 2,
      status: "active",
    });
  });

  it("[get] /orders/order_id/:order_id = 1", async () => {
    const response = await request
      .get("/orders/order_id/1")
      .auth(user_token, { type: "bearer" });

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      order_id: 1,
      user_id: 2,
      status: "active",
    });
  });

  it("[post] /orders/order_id/:order_id/addproduct", async () => {
    const response = await request
      .post("/orders/order_id/1/addproduct")
      .send({ product_id: 1, quantity: 3 })
      .auth(user_token, { type: "bearer" });

    expect(response.status).toEqual(200);
  });

  it("[get] /orders/order_id/:order_id(\\d+)/products", async () => {
    const response = await request
      .get("/orders/order_id/1/products")
      .auth(user_token, { type: "bearer" });

    expect(response.status).toEqual(200);
    expect(response.body[0]).toEqual({
      product: "lumia950",
      price: "599",
      quantity: 1,
      user_id: 2,
    });
  });
});
