
/*!
 * Module dependencies.
 */
var config = require('config')
var DIGITALOCEAN = require('dropletapi').Droplets;
var digitalocean = new DIGITALOCEAN(config.DOKey);

var DODigitalOcean = require('do-wrapper')
var api = new DODigitalOcean(config.DOKey)

exports.create = function (req, res) {
	var myNewDropletData = {
	  "name": req.body.name,
	  "region": req.body.region,
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
