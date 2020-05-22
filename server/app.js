const express = require('express');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(morgan('dev'));

// serve up the react client
app.use(express.static(`${__dirname}/../client/public`));

//handle the routes here

module.exports = app;
