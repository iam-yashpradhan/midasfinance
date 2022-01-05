const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const options = require("../options");
const logger = require('../log');

var knex = require('knex')(options);

router.post('/',async function(req, res, next) {
  const usr=req.body.username;
  const pass=req.body.password;
//   logger.info(usr);
  knex.from('users').select('pass').where('userName',usr)
  .then(async rows=>{
    if(!rows || !rows[0]){
      res.send("Invalid username");
    }else{
      const b=await bcrypt.compare(pass,rows[0].pass).then(b=>b);
      logger.info(rows[0].pass);
      logger.info(pass);
    if(b){
      res.redirect("/addpost"); 
    }else{
      res.send("Incorrect Pass");
    }}
}).catch(err=>console.log(err));
});

router.get('/',(req,res)=>{
  res.render('../views/login');
})

module.exports = router;