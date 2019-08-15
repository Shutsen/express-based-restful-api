const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Security = {};

/**
 * Hash a password
 * @param {String} password 
 * @returns {String} hashedPassword
 */
Security.hash = async password => {
	const hashedPassword = await bcrypt.hash(password, 10);
	return hashedPassword;
};

/**
 * Authenticate user - Compare the input password with the hashed password in the DB
 * @param {String} inputPassword - the password the user tries to authenticate with
 * @param {String} hashedPassword - the hashed password in our DB
 * @returns {Boolean} isValidPassword
 */
Security.authenticate = async (inputPassword, hashedPassword) => {
	const isValidPassword = await bcrypt.compare(inputPassword, hashedPassword);
	return isValidPassword;
};

/**
 * Get token for authenticated user
 * @param {String} email - the email of the user
 * @param {String} id - the id of the user
 * @param {String} key - the JWT_KEY from the .env file
 * @param {String} expiresIn - time in string format - e.g "1h"
 * @returns {String} token
 */
Security.getToken = (email, id, key, expiresIn) => {
	const token = jwt.sign({ email: email, id: id }, key, { expiresIn: expiresIn });
	return token;
};

module.exports = Security;