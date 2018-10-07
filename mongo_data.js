const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017/cache-db';

MongoClient.connect('mongodb://127.0.0.1:27017/cache-db', {
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
          .createIndex({ "createdAt": 1 }, { expireAfterSeconds: 120 });
       process.exit();
    }
);