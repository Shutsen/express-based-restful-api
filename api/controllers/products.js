const mongoose = require('mongoose');
const Product = require('../models/product');

const Products = {}

// Get all products and return them with the total count
Products.getAll = (req, res, next) => {
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
};

// Get the detail of a product
Products.getDetail = (req, res, next) => {
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
};

// Create a new product -- name, price and product image are required
Products.create = (req, res, next) => {
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
			});
		});
};

// Update a product - only updates the fields that are sent and valid
Products.edit = (req, res, next) => {
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
};

// Delete a product
Products.delete = (req, res, next) => {
		Product.remove({ _id: req.params.product_id })
			.exec()
			.then(result => res.status(200).json({ message: 'Product deleted' }))
			.catch(err => res.status(500).json({ error: err }));
};

module.exports = Products;