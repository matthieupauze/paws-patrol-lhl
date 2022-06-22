import { disableCors } from './helpers/express-helpers';

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// All DB and routing files
const db = require('./db/db');
const email = require('./routes/helpers/sendMail');

const coordinateApiRoutes = require('./routes/coordinateApi');
const deviceApiRoutes = require('./routes/deviceApi');
const emailApiRoutes = require('./routes/emailApi');
const perimeterApiRoutes = require('./routes/perimeterApi');
const resetApiRoutes = require('./routes/resetApi');
const tripApiRoutes = require('./routes/tripApi');
const userApiRoutes = require('./routes/userApi');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(disableCors);

app.use(express.static('public'));

// coordinate endpoints
const coordinateApiRouter = express.Router();
coordinateApiRoutes(coordinateApiRouter, db);
app.use('/api/coordinate', coordinateApiRouter);

// device endpoints
const deviceApiRouter = express.Router();
deviceApiRoutes(deviceApiRouter, db);
app.use('/api/device', deviceApiRouter);

// email endpoints
const emailApiRouter = express.Router();
emailApiRoutes(emailApiRouter, email);
app.use('/api/email', emailApiRouter);

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

module.exports = { app, db };
