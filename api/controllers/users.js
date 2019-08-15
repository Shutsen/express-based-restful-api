const mongoose = require('mongoose');
const User = require('../models/user');

const Users = {}

// Get all users and return them with the total count
Users.getAll = (req, res, next) => {
	User.find()
		.select('first_name last_name email _id')
		.then(users => {
			res.status(200).json({
				count: users.length,
				users: users
			})
		})
		.catch(err => res.status(500).json({ error: err }));
};

// Get user detail
Users.getDetail = (req, res, next) => {
	User.findById(req.params.user_id)
		.select('first_name last_name email _id')
		.exec()
		.then(user => res.status(200).json({ user }))
		.catch(err => res.status(500).json({ error: err }));
};

// Delete a user
Users.delete = (req, res, next) => {
	User.remove({ _id: req.params.user_id })
		.exec()
		.then(result => res.status(200).json({ message: 'User deleted' }))
		.catch(err => res.status(500).json({ error: err }));
};

module.exports = Users;