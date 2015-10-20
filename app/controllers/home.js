
/*!
 * Module dependencies.
 */
var DIGITALOCEAN = require('dropletapi').Droplets;
var digitalocean = new DIGITALOCEAN('89d81b8f706e27f8e4c3921f2b8cc4069bc3d20f549f1b6cd02755bd982b58aa');

var DODigitalOcean = require('do-wrapper')
var api = new DODigitalOcean('89d81b8f706e27f8e4c3921f2b8cc4069bc3d20f549f1b6cd02755bd982b58aa', 100)

exports.index = function (req, res) {
	api.regionsGetAll({}, function(error,request,regions) {
 	console.log(regions);
 })

  res.render('home/index', {
    title: 'Node Express Mongoose Boilerplate'
  });
};
