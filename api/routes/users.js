require('dotenv').config()
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

// POST request to signup new users
router.post('/signup', (req, res, next) => {
	User.find({ email: req.body.email })
		.exec()
		.then(user => {
			// if email already exists, return ad hoc
			if (user.length > 0) {
				// Send 409 status code - "Conflict. The request could not be completed due to a conflict with the current state of the target resource."
				return res.status(409).json({ message: 'A user with this email address already exists.' })
			}

			// hash the password and create new user
			bcrypt.hash(req.body.password, 10, (err, hash) => {
				if (err) {
					return res.status(500).json({
						error: err
					});
				}

				const user = new User({
					_id: new mongoose.Types.ObjectId(),
					first_name: req.body.first_name,
					last_name: req.body.last_name,
					email: req.body.email,
					password: hash
				});

				user
				.save()
				.then(result => {
					// Send 201 status code - "Created. The request has been fulfilled and has resulted in one or more new resources being created."
					res.status(201).json({
						message: `Welcome, ${user.first_name}! You have signed up successfully.`,
						user: user
					});
				})
				.catch(err => {
					res.status(500).json({
						error: err
					})
				});
			})
		})
});

// POST request to login existing users
router.post('/login', (req, res, next) => {
	User.find({ email: req.body.email })
		.exec()
		.then(user => {
			if (user.length < 1) {
				// Send 401 status code - Unauthorized error
				return res.status(401).json({ message: 'User authentication failed' });
			}
			bcrypt.compare(req.body.password, user[0].password, (err, compareRes) => {
				if (err) {
					return res.status(401).json({ message: 'User authentication failed' });
				}
				if (compareRes == false) {
					return res.status(401).json({ message: 'User authentication failed' });
				}
				const token = jwt.sign(
					{ email: user[0].email, id: user[0]._id},
					process.env.JWT_KEY,
					{ expiresIn: "1h" },
				);
				return res.status(200).json({
					message: 'Authentication succeeded',
					token: token
				});
			})
			
		})
		.catch(err => res.status(500).json({ error: err }));
})

// GET all users and return them with the total count
router.get('/', (req, res, next) => {
	User.find()
		.select('first_name last_name email _id')
		.then(users => {
			res.status(200).json({
				count: users.length,
				users: users
			})
		})
		.catch(err => res.status(500).json({ error: err }));
});


// GET user detail
router.get('/:user_id', (req, res, next) => {
	User.findById(req.params.user_id)
		.select('first_name last_name email _id')
		.exec()
		.then(user => res.status(200).json({ user }))
		.catch(err => res.status(500).json({ error: err }));
});

// DELETE - remove a certain user
router.delete('/:user_id', (req, res, next) => {
	User.remove({ _id: req.params.user_id })
		.exec()
		.then(result => res.status(200).json({ message: 'User deleted' }))
		.catch(err => res.status(500).json({ error: err }));
});

module.exports = router;