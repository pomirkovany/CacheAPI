"use strict";
// external dependencies
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(logger('dev'));

module.exports = app;
