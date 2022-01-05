var express = require('express');
var router = express.Router();
const options = require("../options");
const multer = require("multer");

var knex = require('knex')(options);

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, options.uploads)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
 
const uploading = multer({ storage: storage })

  function twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
}

  Date.prototype.toMysqlFormat = function() {
    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};

router.post('/',uploading.single('image') ,async function(req, res) {

	const img_name=req.file.filename;
	
	const post={
	 title: req.body.title,
   dateCreated:new Date().toMysqlFormat(),
	 content:req.body.content,
	 img_name:img_name
	}
      
	knex('posts').insert(post).asCallback(function(err) {
			if(err){res.send(err);}else{res.redirect("/getposts");}
	});
});

router.get('/',(req,res)=>{
  res.render('../views/blog-posting')
})

module.exports = router;