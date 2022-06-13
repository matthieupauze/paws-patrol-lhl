var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const db = require('./db/db.js');
const apiRouter = express.Router();
const apiRoutes = require('./routes/api');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

apiRoutes(apiRouter, db);
app.use('/api', apiRouter);

module.exports = app;
