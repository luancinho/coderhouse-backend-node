const { Router } = require('express');
const {
  getProducts,
  getProductById,
} = require('../controllers/products.controller');
const validateId = require('../middleware/id.middleware');

const router = new Router();

router.get('/', getProducts);

router.get('/:id', validateId, getProductById);

module.exports = router;
