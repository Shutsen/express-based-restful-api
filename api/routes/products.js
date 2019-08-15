const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const Product = require('../models/product');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './uploads/');
	},
	filename: function (req, file, cb) {
		cb(null, new Date().toISOString() + '-' + file.originalname);
	}
})

const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
		// accept file
		cb(null, true);
	} else {
		// reject file
		cb(null, false);
	}
}

const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 5
	},
	fileFilter: fileFilter
})

// GET all products and return them with the total count
router.get('/', (req, res, next) => {
	Product.find()
		.select('name price _id productImage')
		.exec()
		.then(products => {
			res.status(200).json({
				count: products.length,
				products: products
			})
		})
		.catch(err => res.status(500).json({ error: err }));
});

// POST new product, API requires name, price and product image
router.post('/', checkAuth, upload.single('productImage'), (req, res, next) => {
	console.log(req.file);
	const product = new Product({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		price: req.body.price,
		productImage: req.file.path
	});
	product
		.save()
		.then(result => {
			res.status(201).json({
				message: 'A new product has been created! Well done!',
				product: product
			});
		})
		.catch(err => {
			res.status(500).json({
				error: err
			})
		});
});

// GET the detail of a certain product
router.get('/:product_id', (req, res, next) => {
	const id = req.params.product_id;
	Product.findById(id)
		.select('name price _id productImage')
		.exec()
		.then(product => {
			if (product) {
				res.status(200).json({ product });
			} else {
				res.status(404).json({
					message: 'No valid product found for the provided id'
				});
			}
		})
		.catch(err => {
			res.status(500).json({
				error: err
			});
		});
});

// PATCH - update a certain product - only updates the fields that are sent and valid
router.patch('/:product_id', checkAuth, (req, res, next) => {
	Product.update({ _id: req.params.product_id }, { $set: req.body })
		.exec()
		.then(result => {
			res.status(200).json({ message: 'Product updated' })
		})
		.catch(err => {
			res.status(500).json({
				error: err
			});
		});
});

// DELETE - remove a certain product
router.delete('/:product_id', checkAuth, (req, res, next) => {
	Product.remove({ _id: req.params.product_id })
		.exec()
		.then(result => res.status(200).json({ message: 'Product deleted' }))
		.catch(err => res.status(500).json({ error: err }));
});

module.exports = router;