import { productsQueries } from "./sql/products";
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
      const result = await pg_query(productsQueries.index);
      const products = result.rows;
      return products;
    } catch (error) {
      throw Error(`Could NOT select all Products. ERROR ${error}`);
    }
  }

  async createProduct(name: string, price: number, category: string) {
    try {
      const result = await pg_query(productsQueries.createProduct, [
        name,
        price,
        category,
      ]);
      const newProduct = result.rows[0];
      return newProduct;
    } catch (error) {
      throw Error(`Could NOT create new Product. ERROR:${error}`);
    }
  }

  async showProduct(productName: string) {
    try {
      const result = await pg_query(productsQueries.showProduct, [productName]);
      const product = result.rows[0];
      return product;
    } catch (error) {
      throw Error(`Could NOT select Product: ${productName}. ERROR:${error}`);
    }
  }

  async deleteProduct(productName: string) {
    try {
      const result = await pg_query(productsQueries.deleteProduct, [
        productName,
      ]);
      const delProduct = result.rows[0];
      return delProduct;
    } catch (error) {
      throw Error(`Could NOT Delete Product: ${productName}. ERROR:${error}`);
    }
  }

  async productsByCategory(categoryName: string) {
    try {
      const result = await pg_query(productsQueries.productsByCategory, [
        categoryName,
      ]);
      const products = result.rows;
      return products;
    } catch (error) {
      throw Error(`Could NOT select all Products. ERROR ${error}`);
    }
  }

  async changePrice(productName: string, price: number) {
    try {
      const result = await pg_query(productsQueries.changePrice, [
        productName,
        price,
      ]);
      const updatedProduct = result.rows[0];
      return updatedProduct;
    } catch (error) {
      throw Error(
        `Could NOT Change price of Product: ${productName}. ERROR:${error}`
      );
    }
  }
}
