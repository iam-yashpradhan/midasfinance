var express = require('express');
var router = express.Router();
const options = require("../options");

var knex = require('knex')(options);

router.get("/",async function(req,res){
    knex.from('posts').then(async rows=>{
        await rows.forEach(element => {
            const img_url = '/uploads/'+element.img_name;
            element.img_url = img_url;
        })
        res.render('../views/blog-grid',{
            posts:rows
        })
    });
});

module.exports = router;