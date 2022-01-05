var express = require('express');
var router = express.Router();
var path = require('path');
const options = require("../options");

var knex = require('knex')(options);

router.get("/",function(req,res){
    knex.from('posts').where('postId',req.query.postId).then(row=>{
        img_name=row[0].img_name;
        console.log(img_name);
        const loc=options.uploads+'/'+img_name;
        console.log(loc);
        res.sendFile(loc);
    });
});

module.exports = router;