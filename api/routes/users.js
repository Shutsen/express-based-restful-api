require('dotenv').config()
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

router.get('/', usersController.getAll);
router.get('/:user_id', usersController.getDetail);
router.post('/signup', usersController.signup);
router.post('/login', usersController.login);
router.delete('/:user_id', usersController.delete);

module.exports = router;