
/*!
 * Module dependencies.
 */
var DIGITALOCEAN = require('dropletapi').Droplets;
var digitalocean = new DIGITALOCEAN('89d81b8f706e27f8e4c3921f2b8cc4069bc3d20f549f1b6cd02755bd982b58aa');

var DODigitalOcean = require('do-wrapper')
var api = new DODigitalOcean('89d81b8f706e27f8e4c3921f2b8cc4069bc3d20f549f1b6cd02755bd982b58aa')

exports.create = function (req, res) {
	var myNewDropletData = {
	  "name": req.body.name,
	  "region": req.body.regions,
	  "size": req.body.size,
	  "image": "ubuntu-14-04-x64",
	  "ssh_keys": null,
	  "backups": false,
	  "ipv6": true,
	  "user_data": null,
	  "private_networking": null
	}
	 
	digitalocean.createDroplet(myNewDropletData, function (error, result) {
    if (error) {
        res.send(400, error)
    }
    else {
        res.send(400, result)
    }
  });
};

exports.regions = function (req, res) {
	api.regionsGetAll({}, function(a,b,c,d) {
		res.send(200, c)
	})
};
