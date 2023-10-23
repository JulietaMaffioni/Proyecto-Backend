const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


let productsData = require('../productos.json');


const saveProducts = () => {
  fs.writeFileSync('./productos.json', JSON.stringify(productsData, null, 2));
};


const addProduct = (newProduct) => {
  if (!newProduct.id || !newProduct.title || !newProduct.description || !newProduct.code || !newProduct.price || !newProduct.stock || !newProduct.category) {
    return null; 
  }

  newProduct.id = uuidv4();
  newProduct.status = true;
  productsData.push(newProduct);
  saveProducts();
  return newProduct;
};


const getProductById = (productId) => {
  return productsData.find((product) => product.id === productId);
};


const updateProduct = (productId, updatedProduct) => {
  const index = productsData.findIndex((product) => product.id === productId);

  if (index !== -1) {
    productsData[index] = { ...productsData[index], ...updatedProduct };
    saveProducts();
    return productsData[index];
  } else {
    return null; 
  }
};


const deleteProduct = (productId) => {
  const index = productsData.findIndex((product) => product.id === productId);

  if (index !== -1) {
    productsData.splice(index, 1);
    saveProducts();
    return { message: 'Producto eliminado' };
  } else {
    return null; 
  }
};

module.exports = {
  addProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
