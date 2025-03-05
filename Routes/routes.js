const express = require('express');
const router = express.Router();
const { CreateProduct, GetProductById , UpdateProduct ,GetAllProducts , DeleteProduct } = require('../Controller/controllerMethods');

// Routes
router.route('/CreateProduct').post(CreateProduct);
router.route('/GetProductById/:id').get(GetProductById);
router.route('/UpdateProduct').put(UpdateProduct);
router.route('/GetAllProducts').get(GetAllProducts);
router.route('/DeleteProduct/:id').delete(DeleteProduct);

module.exports = router;
