"use strict";
require('dotenv').config({silent: true});
// external dependencies
const express = require('express');
const logger = require('morgan');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

//internal dependencies
const configProvider = require('./src/integration/configProvider');

const DummyStringsService = require('./src/components/dummyStrings/dummyStringsService');
const DummyStringsController = require('./src/components/dummyStrings/dummyStringsController');
const CacheModel = require('./src/components/dummyStrings/cacheModel');

const dummyStringsRouter = require('./src/components/dummyStrings/dummyStringsAPI');

const app = express();

app.use(bodyParser.json());

let mongoConnectionPool;

// initiating mongo connection pool
MongoClient.connect(configProvider.mongo.mongoUrl, {
        poolSize: configProvider.mongo.mongoPoolSize,
        useNewUrlParser: true
        // other options can go here
    }, (err, db) => {

        mongoConnectionPool = db;

        // Simple dependency injection.
        // In the real world app I would use some DI framework

        const cacheModel = new CacheModel(mongoConnectionPool, configProvider);
        const dummyStringsService = new DummyStringsService(cacheModel);
        const dummyStringsController = new DummyStringsController(dummyStringsService);

        //init route with injecting controller into it
        app.use('/cache/dummy-strings', dummyStringsRouter(dummyStringsController));

    }
);

app.use(logger('dev'));

module.exports = app;
