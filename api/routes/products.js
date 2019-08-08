const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	res.status(200).json({
		message: 'Handling GET requests to /products'
	});
});

router.post('/', (req, res, next) => {
	const product = {
		name: req.body.name,
		price: req.body.price
	};

	res.status(201).json({
		message: 'A new product has been created! Well done man!',
		product: product
	});
});

router.get('/:product_id', (req, res, next) => {
	const id = req.params.product_id;

	if (id === 'magic') {
		res.status(200).json({
			message: 'You discovered the magic product',
			id: id
		});
	} else {
		res.status(200).json({
			message: 'You discovered a regular product',
			id: id
		});
	}
});

router.patch('/:product_id', (req, res, next) => {
	res.status(200).json({
		message: 'You updated the product'
	});
});

router.delete('/:product_id', (req, res, next) => {
	res.status(200).json({
		message: 'You deleted the product'
	});
});

module.exports = router;