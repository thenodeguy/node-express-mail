'use strict';

var express = require('express');

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var routes = require('./routes/index');
app.use('/', routes);

module.exports = app;
