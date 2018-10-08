const MongoClient = require('mongodb').MongoClient;
const configProvider = require('./src/integration/configProvider');

MongoClient.connect(configProvider.mongo.mongoUrl, {
        useNewUrlParser: true
    }, async (err, db) => {

        if (err) throw err;
        const dbo = db.db();

        await dbo.collection("dummyStrings").drop();

        // Creating capped collection as cache entries are limited
        await dbo
            .createCollection("dummyStrings");

        //adding index with ttl
        await dbo.collection('dummyStrings')
            .createIndex({ "createdAt": 1 }, { expireAfterSeconds: configProvider.mongo.cacheTtlSeconds});
        process.exit();
    }
);