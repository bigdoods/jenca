
/*!
 * Module dependencies.
 */

var mongoose = require('mongoose')
var crypto = require('crypto');
var User = mongoose.model('User');

exports.get = function (req, res) {
	
}

exports.create = function (req, res) {
	var newUser = new User()
	newUser.name = req.body.name
	newUser.email = req.body.email
	newUser.salt = makeSalt()
	newUser.hashed_password = hashPassword(req.body.password, newUser.salt)
	newUser.save(function(user) {
		res.send(201)
	})
}
var makeSalt = function() {
	return 'a'
}
var hashPassword = function(plain, salt) {
	return plain + salt
}

exports.update = function (req, res) {
	
}
