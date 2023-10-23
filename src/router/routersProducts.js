const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const productsRouter = express.Router();


let productsData = require('../products.json');

productsRouter.get('/', (req, res) => {
  const { limit } = req.query;
  let products = productsData;

  if (limit) {
    products = products.slice(0, parseInt(limit));
  }

  res.json(products);
});

productsRouter.get('/:pid', (req, res) => {
  const productId = req.params.pid;
  console.log('ID del producto solicitado:', productId); 

  const product = productsData.find((p) => p.id === productId);
  if (product) {
    res.json(product);
  } else {
    console.log('Producto no encontrado');
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

productsRouter.post('/', (req, res) => {
  const newProduct = req.body;
  if (!newProduct.id || !newProduct.title || !newProduct.description || !newProduct.code || !newProduct.price || !newProduct.stock || !newProduct.category) {
    res.status(400).json({ error: 'Todos los campos son obligatorios' });
    return;
  }

  newProduct.id = uuidv4(); 
  newProduct.status = true;
  productsData.push(newProduct);
  fs.writeFileSync('../productos.json', JSON.stringify(productsData, null, 2));

  res.json(newProduct);
});

productsRouter.put('/:pid', (req, res) => {
  const productId = req.params.pid;
  const updatedProduct = req.body;

  const index = productsData.findIndex((p) => p.id === productId);

  if (index !== -1) {
    productsData[index] = { ...productsData[index], ...updatedProduct };
    fs.writeFileSync('../productos.json', JSON.stringify(productsData, null, 2));
    res.json(productsData[index]);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

productsRouter.delete('/:pid', (req, res) => {
  const productId = req.params.pid;
  const index = productsData.findIndex((p) => p.id === productId);

  if (index !== -1) {
    productsData.splice(index, 1);
    fs.writeFileSync('../productos.json', JSON.stringify(productsData, null, 2));
    res.json({ message: 'Producto eliminado' });
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});


module.exports = productsRouter;
