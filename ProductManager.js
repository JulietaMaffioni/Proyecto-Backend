const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
    this.products = [];
    this.error = undefined;
    this.loadProductsFromFile();
  }

  generateId() {
    return this.products.length === 0 ? 1 : this.products[this.products.length - 1].id + 1;
  }

  validateProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock)
      this.error = `${title}: Incomplete data`;
    else {
      const existingProduct = this.products.find((item) => item.code === code);
      if (existingProduct)
        this.error = `${title}: Code already exists`;
      else
        this.error = undefined;
    }
  }

  addProduct({ title, description, price, thumbnail, code, stock }) {
    this.validateProduct(title, description, price, thumbnail, code, stock);

    if (this.error === undefined) {
      const newProduct = { id: this.generateId(), title, description, price, thumbnail, code, stock };
      this.products.push(newProduct);
      this.saveProductsToFile();
    } else {
      console.log(this.error);
    }
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((item) => item.id === id);
    return product ? product : 'Product not found';
  }

  loadProductsFromFile() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf8');
      this.products = JSON.parse(data);
    } catch (error) {
      this.products = [];
    }
  }

  saveProductsToFile() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.products, null, 2), 'utf8');
  }

  updateProduct(id, updatedFields) {
    const productIndex = this.products.findIndex(product => product.id === id);

    if (productIndex !== -1) {
      updatedFields.id = id;
      this.products[productIndex] = { ...this.products[productIndex], ...updatedFields };
      this.saveProductsToFile();
      return this.products[productIndex];
    }

    return null;
  }

  deleteProduct(id) {
    const productIndex = this.products.findIndex(product => product.id === id);

    if (productIndex !== -1) {
      this.products.splice(productIndex, 1);
      this.saveProductsToFile();
      return true;
    }

    return false;
  }
}

module.exports = ProductManager;
