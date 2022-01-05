var express = require('express');
var cors = require('cors');
var indexRouter = require('./routes/index');
var register=require("./routes/register");
var login=require("./routes/login");
const getposts=require("./routes/getposts");
const getpost=require("./routes/getpost");
const addpost=require("./routes/addpost");
const getpostImage=require("./routes/getpostImage");
const deletepost=require("./routes/deletepost");
const path = require('path');
const options = require("./options");
const logger = require('./log');

var knex = require('knex')(options);

var app = express();

const asset  = path.join('assets');

app.use(express.static(asset));
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

app.get('/log', (req, res) => {
    // logger.info(knex.client);
    res.sendFile(path.join(__dirname + '/debug.log'));
});


app.get('/',function(req,res){
    res.render('index.html');
})

app.use("/register",register);
app.use("/login",login);
app.use("/addpost",addpost);
app.use("/getpost",getpost);
app.use("/getposts",getposts);
app.use("/getpostImage",getpostImage);
app.use("/deletepost",deletepost);

app.listen(3000);

module.exports = app;
