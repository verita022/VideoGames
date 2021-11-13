const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
//const Videogame = require('./models/Videogame.js');
const { Videogame, Gender} = require('./db.js');

require('dotenv').config();
require('./db.js');

const server = express();

const cors = require('cors')

server.name = 'API';

server.use(cors())
server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.options('*', cors());

server.use(express.json())
server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});




module.exports = server;
