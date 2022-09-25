import Products from "../../src/models/products";

describe("Products Model", () => {
  const productsModel = new Products();

  it("should have an index method", () => {
    expect(productsModel.index).toBeDefined();
  });

  it("should have a showProduct method", () => {
    expect(productsModel.showProduct).toBeDefined();
  });

  it("should have a createProduct method", () => {
    expect(productsModel.createProduct).toBeDefined();
  });

  it("should have a shoe productsByCategory() method", () => {
    expect(productsModel.productsByCategory).toBeDefined();
  });

  it("should have a changePrice method", () => {
    expect(productsModel.changePrice).toBeDefined();
  });

  it("should have a deleteProduct method", () => {
    expect(productsModel.deleteProduct).toBeDefined();
  });

  it("index method should return a list of products", async () => {
    const result = await productsModel.index();

    expect(result).toEqual([
      {
        product_id: 1,
        product: "lumia950",
        price: "599",
        category: "electronics",
      },
    ]);
  });

  it("showProduct method should return the correct product by name", async () => {
    const result = await productsModel.showProduct("lumia950");
    expect(result).toEqual({
      product_id: 1,
      product: "lumia950",
      price: "599",
      category: "electronics",
    });
  });

  it("createProduct method should add a product", async () => {
    const result = await productsModel.createProduct("shirt", 4.9, "clothes");

    expect(result).toEqual({
      product_id: 3,
      name: "shirt",
      price: "4.9",
      category_id: 1,
    });
  });

  it("productsByCategory method should return the list of products", async () => {
    const result = await productsModel.productsByCategory("clothes");

    expect(result).toEqual([
      {
        product: "shirt",
        price: "4.9",
      },
    ]);
  });

  it("a changePrice method", async () => {
    const result = await productsModel.changePrice("shirt", 3.9);
    expect(result).toEqual({
      product_id: 3,
      name: "shirt",
      price: "3.9",
      category_id: 1,
    });
  });

  it("a deleteProduct method", async () => {
    const result = await productsModel.deleteProduct("shirt");
    expect(result).toEqual({
      product_id: 3,
      name: "shirt",
      price: "3.9",
      category_id: 1,
    });
  });
});
