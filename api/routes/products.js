const express = require('express');
const router = express.Router();
const uploadImage = require('../../utils/upload_image');
const checkAuth = require('../middleware/check-auth');
const ProductsController = require('../controllers/products');

router.get('/', ProductsController.getAll);
router.get('/:product_id', ProductsController.getDetail);
router.post('/', checkAuth, uploadImage.single('productImage'), ProductsController.create);
router.patch('/:product_id', checkAuth, ProductsController.edit);
router.delete('/:product_id', checkAuth, ProductsController.delete);

module.exports = router;