const express = require("express");
const app = new express();
const bodyParser = require('body-parser');
const cors = require('cors');

//app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'html');
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/'));

let searchRoute = require('./routes/search.route');
let importRoute = require('./routes/import.route');

app.use('/search',cors(), searchRoute);
app.use('/import',cors(), importRoute);
app.use('/checkAvailable',cors(), (req, res) => {res.send("OK")});

app.listen(3001);