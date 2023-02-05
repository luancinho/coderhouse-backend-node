const path = require('path');
const { request, response } = require('express');
const ProductManager = require('../models/ProductManager');

const productsGet = async (req = request, res = response) => {
  ProductManager.path = path.join(__dirname, '../db/data.json');
  const products = ProductManager.products();
  res.send(products);
};

module.exports = {
  productsGet,
};
