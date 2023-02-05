/* eslint-disable lines-between-class-members */
const fs = require('fs').promises;

class ProductManager {
  static #products;
  static #path;

  static set path(path) {
    ProductManager.#path = path;
  }

  static get path() {
    return ProductManager.#path;
  }

  static async products() {
    await this.loadData();
    return ProductManager.#products;
  }

  static async loadData() {
    try {
      const data = await fs.readFile(ProductManager.#path, 'utf-8');
      const object = data === '' ? [] : JSON.parse(data);
      ProductManager.#products = object.products;
      console.log(ProductManager.#products);
    } catch (err) {
      console.log(err.message);
    }
  }
}

module.exports = ProductManager;
