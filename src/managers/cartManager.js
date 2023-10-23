const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


let cartsData = require('../carrito.json');


const saveCarts = () => {
  fs.writeFileSync('./carrito.json', JSON.stringify(cartsData, null, 2));
};


const createCart = () => {
  const newCart = {
    id: uuidv4(),
    products: [],
  };
  cartsData.push(newCart);
  saveCarts();
  return newCart;
};


const getCartById = (cartId) => {
  return cartsData.find((cart) => cart.id === cartId);
};


const addProductToCart = (cartId, productId, quantity) => {
  const cart = getCartById(cartId);

  if (!cart) {
    return null; 
  }

  const existingProduct = cart.products.find((p) => p.product === productId);

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.products.push({ product: productId, quantity });
  }

  saveCarts();
  return cart.products;
};

module.exports = {
  createCart,
  getCartById,
  addProductToCart,
};
