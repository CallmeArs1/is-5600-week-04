const Products = require('./products');
const autoCatch = require('./lib/auto-catch');

async function handleRoot(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
}

async function listProducts(req, res) {
  const { limit = 25, offset = 0, tag } = req.query;
  const options = {
    limit: Number(limit),
    offset: Number(offset),
    tag,
  };

  const products = await Products.list(options);
  res.json(products);
}

async function getProduct(req, res, next) {
  const { id } = req.params;
  const product = await Products.get(id);
  if (!product) return next();
  res.json(product);
}

async function createProduct(req, res) {
  const newProduct = await Products.create(req.body);
  res.status(201).json(newProduct);
}

async function updateProduct(req, res) {
  const { id } = req.params;
  const updatedProduct = await Products.update(id, req.body);
  res.status(200).json(updatedProduct);
}

async function deleteProduct(req, res) {
  const { id } = req.params;
  await Products.delete(id);
  res.status(202).json({ message: `Product ${id} deleted` });
}

module.exports = autoCatch({
  handleRoot,
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
});
