const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const cartsRouter = express.Router();


let cartsData = require('../carts.json');

cartsRouter.post('/', (req, res) => {
    
    const cartId = uuidv4();
   
    const newCart = {
      id: cartId,
      products: [],
    };
  
    cartsData.push(newCart);
  
    fs.writeFileSync('./carts.json', JSON.stringify(cartsData, null, 2));
  
    res.status(201).json(newCart);
  });
  
  cartsRouter.get('/', (req, res) => {
    res.json(cartsData);
  });

  cartsRouter.get('/:cid', (req, res) => {
    const cartId = req.params.cid;
  
    const cart = cartsData.find((c) => c.id === cartId);
  
    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }
  
    res.json(cart.products);
  });
  
  
  cartsRouter.post('/:cid/product/:pid', (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = 1;
    const cart = cartsData.find((c) => c.id === cartId);
  
    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }
  

    const existingProduct = cart.products.find((product) => product.product === productId);
  
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({
        product: productId,
        quantity: quantity,
      });
    }
  
    fs.writeFileSync('./carts.json', JSON.stringify(cartsData, null, 2));
  
    res.json({ message: `Producto ${productId} agregado al carrito ${cartId}` });
  });
  
  

module.exports = cartsRouter;
