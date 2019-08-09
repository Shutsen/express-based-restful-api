const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

router.get('/', (req, res, next) => {
	Product.find()
		.exec()
		.then(products => res.status(200).json({ products }))
		.catch(err => res.status(500).json({ error: err }));
});

router.post('/', (req, res, next) => {
	const product = new Product({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		price: req.body.price
	});
	product
		.save()
		.then(result => {
			res.status(201).json({
				message: 'A new product has been created! Well done man!',
				product: product
			});
		})
		.catch(err => {
			res.status(500).json({
				error: err
			})
		});
});

router.get('/:product_id', (req, res, next) => {
	const id = req.params.product_id;
	Product.findById(id)
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

router.patch('/:product_id', (req, res, next) => {
	console.log('connected via Patch request')
	Product.update({ _id: req.params.product_id }, { $set: req.body })
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

router.delete('/:product_id', (req, res, next) => {
	Product.remove({ _id: req.params.product_id })
		.exec()
		.then(result => res.status(200).json({ result }))
		.catch(err => res.status(500).json({ error: err }));
});

module.exports = router;