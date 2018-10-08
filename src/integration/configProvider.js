module.exports = {
    mongo: {
        cacheCollectionName: process.env.CACHE_COLLECTION_NAME
            ? process.env.CACHE_COLLECTION_NAME
            : "dummyStrings",
        mongoUrl: process.env.MONGO_URL
            ? process.env.MONGO_URL
            : "mongodb://127.0.0.1:27017/cache-db",
        mongoPoolSize: process.env.MONGO_POOL_SIZE
            ? process.env.MONGO_POOL_SIZE
            : 20,
        cacheMaxSize: process.env.CACHE_MAX_SIZE
            ? process.env.CACHE_MAX_SIZE
            : 10,
        cacheTtlSeconds: process.env.CACHE_TTL_SECONDS
            ? process.env.CACHE_TTL_SECONDS
            : 30,
    }


}