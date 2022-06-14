var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// All DB and routing files
const db = require('./db/db.js');
const coordinateApiRoutes = require('./routes/coordinateApi')
const deviceApiRoutes = require('./routes/deviceApi');
const perimeterApiRoutes = require('./routes/perimeterApi');
const resetApiRoutes = require('./routes/resetApi');
const tripApiRoutes = require('./routes/tripApi');
const userApiRoutes = require('./routes/userApi');

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

// coordinate endpoints


// device endpoints


// perimeter endpoints


// reset endpoints


// trip endpoints


// user endpoints


module.exports = app;