import { Request, Response, NextFunction } from 'express';

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// All DB and routing files
const db = require('./db/db.js');
const coordinateApiRoutes = require('./routes/coordinateApi');
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

app.use(function (req: Request, res: Response, next: NextFunction) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Pass to next layer of middleware
  next();
});

// coordinate endpoints
const coordinateApiRouter = express.Router();
coordinateApiRoutes(coordinateApiRouter, db);
app.use('/api/coordinate', coordinateApiRouter);

// device endpoints
const deviceApiRouter = express.Router();
deviceApiRoutes(deviceApiRouter, db);
app.use('/api/device', deviceApiRouter);

// perimeter endpoints
const perimeterApiRouter = express.Router();
perimeterApiRoutes(perimeterApiRouter, db);
app.use('/api/perimeter', perimeterApiRouter);

// reset endpoints
const resetApiRouter = express.Router();
resetApiRoutes(resetApiRouter, db);
app.use('/api/reset', resetApiRouter);

// trip endpoints
const tripApiRouter = express.Router();
tripApiRoutes(tripApiRouter, db);
app.use('/api/trip', tripApiRouter);

// user endpoints
const userApiRouter = express.Router();
userApiRoutes(userApiRouter, db);
app.use('/api/user', userApiRouter);

module.exports = app;
