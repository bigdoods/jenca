
/*!
 * Module dependencies.
 */
var config = require('config')
var DIGITALOCEAN = require('dropletapi').Droplets;
var digitalocean = new DIGITALOCEAN(config.DOKey);

var DODigitalOcean = require('do-wrapper')
var api = new DODigitalOcean(config.DOKey)

exports.create = function (req, res) {
	var dropletData = {
	  "name": req.body.name,
	  "region": req.body.region,
	  "size": req.body.size,
	  "image": "ubuntu-14-04-x64",
	  "ssh_keys": null,
	  "backups": false,
	  "ipv6": true,
	  "user_data": "#cloud-config\nruncmd:\n  - wget -qO- https://raw.githubusercontent.com/jenca-cloud/jenca-cloud/master/scripts/install.sh | sh\n",
	  "private_networking": null
	}

	digitalocean.createDroplet(dropletData, function (error, result) {
    if (error) {
      res.send(400, error)
    }
    else {
      console.log(result)
      res.send(201, result)
    }
  });
};

exports.regions = function (req, res) {
	api.regionsGetAll({}, function(a,b,c,d) {
		res.send(200, c)
	})
};
