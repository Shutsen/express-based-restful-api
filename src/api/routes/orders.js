const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	res.status(200).json({
		message: 'Bingo! Orders were fetched'
	});
});

router.post('/', (req, res, next) => {
	const order = {
		product_id: req.body.product_id,
		quantity: req.body.quantity
	};

	res.status(201).json({
		message: 'Hooray! Order was created',
		order: order
	});
});

router.get('/:order_id', (req, res, next) => {
	res.status(200).json({
		message: 'Inspecting the order details, huh..',
		id: req.params.order_id
	});
});

router.delete('/:order_id', (req, res, next) => {
	res.status(200).json({
		message: 'Damn, you deleted the order',
		id: req.params.order_id
	});
});

module.exports = router;