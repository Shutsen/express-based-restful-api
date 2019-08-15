require('dotenv').config()
const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/users');

router.get('/', UsersController.getAll);
router.get('/:user_id', UsersController.getDetail);
router.post('/signup', UsersController.signup);
router.post('/login', UsersController.login);
router.delete('/:user_id', UsersController.delete);

module.exports = router;