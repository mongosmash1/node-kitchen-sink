const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const logger = require('../middleware');

const { Schema } = mongoose;

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const validateEmail = email => emailRegex.test(email);

// Define userSchema
const userSchema = new Schema({
	username: {
		type: String,
		unique: true,
		required: 'Username is required',
		trim: true,
		lowercase: true,
	},
	first: {
		type: String,
		unique: false,
		required: 'First name is required',
		trim: true,
	},
	last: {
		type: String,
		unique: false,
		required: 'Last name is required',
		trim: true,
	},
	email: {
		type: String,
		unique: false,
		required: 'Email address is required',
		trim: true,
		lowercase: true,
		validate: [validateEmail, 'Please use a valid email address'],
		match: [emailRegex, 'Please use a valid email address'],
	},
	imagePath: {
		type: String,
		unique: false,
		required: false,
		trim: true,
	},
	password: {
		type: String,
		unique: false,
		required: 'A password is required',
		trim: true,
	},
});

userSchema.methods = {
	verifyPassword(inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password);
	},
	hashPassword: plainTextPassword => bcrypt.hashSync(plainTextPassword, 10),
};

userSchema.pre('save', async () => {
	logger.debug(JSON.stringify(this));
	if (!this.password) {
		logger.error('No password provided');
	} else {
		logger.debug('Hashing password');
		this.password = await this.hashPassword(this.password);
	}
});

const User = mongoose.model('User', userSchema);

module.exports = User;
