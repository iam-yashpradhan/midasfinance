var express = require('express');
var router = express.Router();
const options = require("../options");

var knex = require('knex')(options);

router.post('/', async function(req,res) {
    knex('posts').where('postId', req.query.postId).del()
    .asCallback(function(err) {
			if(err){res.send("An error occured. Please try again later.");}else{res.redirect('/deletepost');}
	});
});

router.get('/',(req,res)=>{
     knex.from('posts').then(async rows=>{
        res.render('../views/blog-history',{
            posts:rows
        });
     });
});

module.exports = router;