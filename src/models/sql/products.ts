export const productsQueries = {
  index: `
    SELECT
      product_id,
      products.name AS product,
      products.price,
      category.name AS category
    FROM products JOIN category USING (category_id)`,

  createProduct: `
    INSERT INTO products (name ,price, category_id)  
    VALUES ($1, $2, (SELECT category_id FROM category WHERE category.name = $3))
    RETURNING *`,

  showProduct: `
    SELECT
      product_id,
      products.name AS product,
      products.price,
      category.name AS category
    FROM products JOIN category USING (category_id)  
    WHERE products.name = $1`,

  deleteProduct: `
    DELETE FROM products
    WHERE products.name = $1
    RETURNING *`,

  productsByCategory: `
    SELECT 
      products.name AS product,
      products.price
    FROM products JOIN category USING (category_id)
    WHERE category.name = $1`,

  changePrice: `
    UPDATE products
    SET price = $2
    WHERE products.name = $1
    RETURNING *`,
};
