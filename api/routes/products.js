const express = require('express');
const router = express.Router();
const uploadImage = require('../../utils/upload_image');
const checkAuth = require('../middleware/check-auth');
const productsController = require('../controllers/products');

router.get('/', productsController.getAll);
router.get('/:product_id', productsController.getDetail);
router.post('/', checkAuth, uploadImage.single('productImage'), productsController.create);
router.patch('/:product_id', checkAuth, productsController.edit);
router.delete('/:product_id', checkAuth, productsController.delete);

module.exports = router;