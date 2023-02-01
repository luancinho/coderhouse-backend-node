const fs = require('fs').promises;
const { NoIdRegisteredError } = require('../utils/errors');
const Product = require('./Product');

class ProductManager {
  #products;

  constructor(path) {
    this.path = path;
    this.#products = [];
  }

  async getProducts() {
    await this.loadData();
    return this.#products;
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    const product = new Product(
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    );
    this.#products.push(product);
    await this.saveData();
    return true;
  }

  async updateProduct(id, campo, value) {
    let flag = false;
    for (let i = 0; i < this.#products.length; i++) {
      if (this.#products[i].id === id) {
        this.#products[i][campo] = value;
        flag = true;
        break;
      }
    }

    if (flag) {
      await this.saveData();
      return true;
    }

    throw new NoIdRegisteredError(
      `No hay registro de algún producto con id > ${id}`,
    );
  }

  async deleteProduct(id) {
    let flag = false;
    for (let i = 0; i < this.#products.length; i++) {
      if (this.#products[i].id === id) {
        this.#products.splice(i, 1);
        flag = true;
        break;
      }
    }

    if (flag) {
      await this.saveData();
      return true;
    }
    throw new NoIdRegisteredError(
      `No hay registro de algún producto con id > ${id}`,
    );
  }

  getProductById(id) {
    for (let i = 0; i < this.#products.length; i++) {
      if (this.#products[i].id === id) {
        return this.#products[i];
      }
    }
    throw new NoIdRegisteredError(
      `No hay registro de algún producto con id > ${id}`,
    );
  }

  async loadData() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      this.#products = data === '' ? [] : JSON.parse(data);
    } catch (err) {
      console.log(err.message);
    }
  }

  async saveData() {
    try {
      const jsonData = JSON.stringify(this.#products);
      await fs.writeFile(this.path, jsonData, 'utf-8');
    } catch (err) {
      console.log(err.message);
    }
  }
}

module.exports = ProductManager;
