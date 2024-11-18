const fs = require('fs').promises;
const path = require('path');

const productsFile = path.join(__dirname, 'data/full-products.json');

module.exports = {
  list,
  get,
  create,
  update,
  delete: deleteProduct, // Added delete method
};

/**
 * List all products
 * @returns {Promise<Array>}
 */
async function list({ limit = 25, offset = 0, tag }) {
  const data = JSON.parse(await fs.readFile(productsFile));
  let products = data;
  if (tag) {
    products = products.filter((product) => product.tags?.some((t) => t.title === tag));
  }
  return products.slice(offset, offset + limit);
}

/**
 * Get a single product
 * @param {string} id
 * @returns {Promise<object>}
 */
async function get(id) {
  const products = JSON.parse(await fs.readFile(productsFile));
  return products.find((product) => product.id === id) || null;
}

/**
 * Create a new product
 * @param {object} productData
 * @returns {Promise<object>}
 */
async function create(productData) {
  console.log('New product created:', productData);
  return productData; // Return the product data as a response
}

/**
 * Update an existing product
 * @param {string} id
 * @param {object} productData
 * @returns {Promise<object>}
 */
async function update(id, productData) {
  console.log(`Product ${id} updated with data:`, productData);
  return { id, ...productData }; // Return the updated product as a response
}

/**
 * Delete a product
 * @param {string} id
 * @returns {Promise<void>}
 */
async function deleteProduct(id) {
  console.log(`Product ${id} deleted`);
  return; // No actual deletion is performed
}
