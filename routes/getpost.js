var express = require('express');
const path = require('path');
var router = express.Router();
const options = require("../options");

var knex = require('knex')(options);

router.get("/",function(req,res){
    knex.from('posts').where('postId',req.query.postId).then(rows=>{
        const img_url = '/uploads/'+rows[0].img_name;
        res.render('../views/blog',{
            title:rows[0].title,
            content:rows[0].content,
            date:rows[0].dateCreated,
            img_url: img_url
        })
    });
});

module.exports = router;