import { pg_query } from "./_database/pg_query";

export interface Product {
  product_id: number;
  name: string;
  price: number;
  category_id: number;
}

export default class Products {
  async index() {
    try {
      const sql = `
      SELECT
        product_id,
        products.name AS product,
        products.price,
        category.name AS category
      FROM products JOIN category USING (category_id)`;
      const result = await pg_query(sql);
      const products = result.rows;
      return products;
    } catch (error) {
      throw Error(`Could NOT select all Products. ERROR ${error}`);
    }
  }

  async createProduct(name: string, price: number, category: string) {
    try {
      const sql = `
      INSERT INTO products (name ,price, category_id)  
      VALUES ($1, $2, (SELECT category_id FROM category WHERE category.name = $3))
      RETURNING *`;
      const result = await pg_query(sql, [name, price, category]);
      const newProduct = result.rows[0];
      return newProduct;
    } catch (error) {
      throw Error(`Could NOT create new Product. ERROR:${error}`);
    }
  }

  async showProduct(productName: string) {
    try {
      const sql = `
      SELECT
        product_id,
        products.name AS product,
        products.price,
        category.name AS category
      FROM products JOIN category USING (category_id)  
      WHERE products.name = $1`;
      const result = await pg_query(sql, [productName]);
      const product = result.rows[0];
      return product;
    } catch (error) {
      throw Error(`Could NOT select Product: ${productName}. ERROR:${error}`);
    }
  }

  async deleteProduct(productName: string) {
    try {
      const sql = `
      DELETE FROM products
      WHERE products.name = $1
      RETURNING *`;
      const result = await pg_query(sql, [productName]);
      const delProduct = result.rows[0];
      return delProduct;
    } catch (error) {
      throw Error(`Could NOT Delete Product: ${productName}. ERROR:${error}`);
    }
  }

  async productsByCategory(categoryName: string) {
    try {
      const sql = `
      SELECT 
        products.name AS product,
        products.price
      FROM products JOIN category USING (category_id)
      WHERE category.name = $1`;
      const result = await pg_query(sql, [categoryName]);
      const products = result.rows;
      return products;
    } catch (error) {
      throw Error(`Could NOT select all Products. ERROR ${error}`);
    }
  }

  async changePrice(productName: string, price: number) {
    try {
      const sql = `
      UPDATE products
      SET price = $2
      WHERE products.name = $1
      RETURNING *`;
      const result = await pg_query(sql, [productName, price]);
      const updatedProduct = result.rows[0];
      return updatedProduct;
    } catch (error) {
      throw Error(
        `Could NOT Change price of Product: ${productName}. ERROR:${error}`
      );
    }
  }
}
