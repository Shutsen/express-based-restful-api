const request = require('supertest')
const app = require('../app')
const jwt = require('jsonwebtoken')
const security = require('../utils/authentication/security')
const mongoose = require('mongoose')
const User = require('../api/models/user')

const userOneId = new mongoose.Types.ObjectId()
const userOnePassword = 'randomPassword'
const token = jwt.sign({ _id: userOneId }, process.env.JWT_KEY)

let userOne = {
	_id: userOneId,
	first_name: 'Cor',
	last_name: 'Tisone',
	email: 'cortisone@example.com',
	tokens: [ { token } ]
}

beforeEach(async () => {
	await User.deleteMany()
	const hashedPassword = await security.hash(userOnePassword)
	userOne = { ...userOne, password: hashedPassword }
	await new User(userOne).save()
})

test('Should signup a new user', async () => {
	const response = await request(app)
		.post('/users/signup')
		.send({
			first_name: 'Brik',
			last_name: 'Olage',
			email: 'brikolage@example.com',
			password: 'aRandomPassword'
		})
		.expect(201)
	
	const user = await User.findById(response.body.user._id)
	expect(user).not.toBeNull()

	expect(response.body).toMatchObject({
		user: {
			first_name: 'Brik',
			last_name: 'Olage',
			email: 'brikolage@example.com',
		}
	})

	expect(user.password).not.toBe(userOnePassword)
})