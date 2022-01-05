var express = require('express');
var router = express.Router();
var bcrypt = require("bcryptjs");
const options = require("../options");
const logger = require('../log');

var knex = require('knex')(options);

router.post('/',async function(req, res, next) {
	logger.info(req.body);
	let pass=req.body.password;
	pass=await bcrypt.hash(pass, 8).then(p=>p);
	logger.info(pass);
	const user={
	 firstName: req.body.first_name, 
	 lastName:req.body.last_name,
	 userName:req.body.username,
	 pass:pass
	}

	knex('users').insert(user).asCallback(function(err) {
			if(err){res.send(err);}else{res.send("success");}
	});
});

router.get('/', function(req,res){
    res.send("No register page available");
});

module.exports = router;