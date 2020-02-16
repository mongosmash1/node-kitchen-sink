/* eslint-disable no-underscore-dangle */
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { User } = require('../models');

// called on login, saves the id to session req.session.passport.user = {id:'..'}
passport.serializeUser((user, done) => {
	done(null, { _id: user._id });
});

// user object attaches to the request as req.user
passport.deserializeUser((id, done) => {
	User.findOne({ _id: id }, 'username', (err, user) => {
		done(null, user);
	});
});

const strategy = new LocalStrategy(
	{
		usernameField: 'username', // not necessary, DEFAULT
		passwordField: 'password', // not necessary, DEFAULT
	},
	(username, password, done) => {
		User.findOne({ username }, (err, user) => {
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(null, false, { message: 'Incorrect username' });
			}
			if (!user.verifyPassword(password)) {
				return done(null, false, { message: 'Incorrect password' });
			}
			return done(null, user);
		});
	}
);

//  Use Strategies
passport.use(strategy);

module.exports = passport;
