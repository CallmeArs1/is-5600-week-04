const express = require('express');
const bodyParser = require('body-parser');
const api = require('./api');
const middleware = require('./middleware');

const port = process.env.PORT || 3000;
const app = express();

app.use(middleware.cors);
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// Routes
app.get('/', api.handleRoot);
app.get('/products', api.listProducts);
app.get('/products/:id', api.getProduct);
app.post('/products', api.createProduct);
app.put('/products/:id', api.updateProduct); // Added PUT route
app.delete('/products/:id', api.deleteProduct); // Added DELETE route

app.use(middleware.handleError);
app.use(middleware.notFound);

app.listen(port, () => console.log(`Server listening on port ${port}`));
