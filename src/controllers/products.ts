// products controller

import { Request, Response } from "express";

import Products from "../models/products";

const products = new Products();

async function createProduct(req: Request, res: Response) {
  try {
    const { name, price, category } = req.body;
    const newProduct = await products.createProduct(name, price, category);
    res.json(newProduct);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
}

async function index(req: Request, res: Response) {
  try {
    const allProduct = await products.index();
    res.json(allProduct);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
}

async function changePrice(req: Request, res: Response) {
  try {
    const { name, price } = req.body;
    const updatedProduct = await products.changePrice(name, price);
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
}

async function deleteProduct(req: Request, res: Response) {
  try {
    const name = req.body.name;
    const delProduct = await products.deleteProduct(name);
    res.json(delProduct);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
}

async function showProduct(req: Request, res: Response) {
  try {
    const productName = req.params.product;
    const product = await products.showProduct(productName);
    if (!product) throw Error(`unavailable procuct: ${productName}`);
    res.json(product);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
}

async function productsByCategory(req: Request, res: Response) {
  try {
    const categoryName = req.params.categoryName;
    const productsByCategory = await products.productsByCategory(categoryName);
    if (!productsByCategory.length) {
      throw Error(`unavailable procuct under category: ${categoryName}`);
    }
    res.json(productsByCategory);
  } catch (error) {
    res.status(400).send((error as Error).message);
  }
}

export default {
  index,
  createProduct,
  showProduct,
  deleteProduct,
  productsByCategory,
  changePrice,
};
