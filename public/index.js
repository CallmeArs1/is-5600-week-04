document.addEventListener('DOMContentLoaded', () => {
  // Fetch the products when the page loads
  fetch('/products')
    .then((response) => {
      if (!response.ok) throw new Error('Failed to fetch products');
      return response.json();
    })
    .then((products) => {
      renderProducts(products); // Render the products
    })
    .catch((err) => {
      console.error('Error fetching products:', err);
      document.body.innerHTML = '<p style="color:red;">Failed to load products.</p>';
    });
});

/**
 * Renders the fetched products to the DOM
 * @param {Array} products - Array of product objects
 */
function renderProducts(products) {
  const container = document.getElementById('products-container');
  container.innerHTML = ''; // Clear existing products

  products.forEach((product) => {
    const productHTML = `
      <div class="product-card">
        <img src="${product.urls.thumb}" alt="${product.description || 'Product'}" />
        <h2>${product.description || 'No Description'}</h2>
        <p><strong>Color:</strong> ${product.color}</p>
        <p><strong>Dimensions:</strong> ${product.width}x${product.height}</p>
        <p><strong>Likes:</strong> ${product.likes}</p>
      </div>`;
    container.innerHTML += productHTML; // Add product card
  });
}
