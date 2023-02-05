const { Router } = require('express');
const { productsGet } = require('../controllers/products.controller');

const router = new Router();

router.get('/', productsGet);

module.exports = router;
