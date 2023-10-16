const express = require('express');
const bodyParser = require('body-parser');
const ProductManager = require('./ProductManager');

const app = express();
const port = 8080;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Bienvenido a mi aplicación');
});

app.get('/products', (req, res) => {
  const { limit } = req.query;
  let products = productManager.getProducts();

  if (limit) {
    products = products.slice(0, parseInt(limit, 10));
  }

  res.json({ products });
});

app.get('/products/:pid', (req, res) => {
  const { pid } = req.params;
  const product = productManager.getProductById(parseInt(pid, 10));

  if (product !== 'Product not found') {
    res.json({ product });
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

const productManager = new ProductManager('products.json');

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
