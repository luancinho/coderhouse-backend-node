/* eslint-disable lines-between-class-members */
const fs = require('fs').promises;
const { IdError, DatabaseError } = require('../helpers/errors.helpers');

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
    } catch (err) {
      throw new DatabaseError(err.message);
    }
  }

  static async getById(id) {
    try {
      await ProductManager.loadData();
      const result = ProductManager.#products.find(
        (product) => product.id === id,
      );
      if (result) return result;
      throw new IdError(`There is no product with id #${id}`);
    } catch (err) {
      throw new DatabaseError(err.message);
    }
  }
}

module.exports = ProductManager;
