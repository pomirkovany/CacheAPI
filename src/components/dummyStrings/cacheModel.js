class CacheModel {

    constructor(mongoConnection, configProvider) {
        this.mongoConnection = mongoConnection;
        this.configProvider = configProvider;
    }

    /**
     * Cache collection size
     *
     * @returns {Promise<void>}
     */
    async getCacheSize() {
        return await this.getCollection().estimatedDocumentCount();
    }

    /**
     * helper method to make query statements shorter
     *
     * @returns {*}
     */
    getCollection() {
        return this.mongoConnection
            .db()
            .collection(this.configProvider.mongo.cacheCollectionName);
    }

    /**
     * Adds a new key-item pair to the cache. In  case if limit is
     * reached - replaces the oldest key-value pair.
     *
     * @param key
     * @param item
     * @returns {Promise<void>}
     */
    async insert(key, item) {
        if((await this.getCacheSize()) >= this.configProvider.mongo.cacheMaxSize) {
            await this.getCollection().findOneAndUpdate(
                { },
                { $set: {key, item, createdAt: new Date()} },
                { sort: {createdAt:1}, }
            );
        } else {
            await this.getCollection()
                .insertOne({
                    key,
                    item,
                    createdAt: new Date()
                });
        }
    }

    /**
     *
     * @param key
     * @param newItem
     * @returns {Promise<*>}
     */
    async updateByKey(key, newItem) {
        const result = await this.getCollection().updateOne(
            {key},
            { $set: {item: newItem, createdAt: new Date()} },
            { upsert: true }
        );
        return result.updatedExisting;
    }

    /**
     * Returns item by key and refreshes its TTL
     *
     * @param key
     * @returns {Promise<null>}
     */
    async getByKey(key) {
        const result = await this.getCollection()
            .findOneAndUpdate(
                { key },
                { $set: { createdAt: new Date() } },
            );
        return result.value ? result.value.item : null;
    }

    /**
     *
     * @param key
     * @returns {Promise<number|*|Number>}
     */
    async removeByKey(key) {
        const result = await this.getCollection()
            .deleteOne({key}, true);
        console.log(result.deletedCount);
        return result.deletedCount;

    }

    /**
     *
     * @returns {Promise<number|*|Number>}
     */
    async removeAll() {
        const result = await this.getCollection()
            .deleteMany({});
        return result.deletedCount;
    }

}

module.exports = CacheModel;