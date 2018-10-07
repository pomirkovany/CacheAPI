const MAX_SIZE = process.env.MAX_SIZE ? process.env.MAX_SIZE : 20;

class CacheModel {

    constructor(mongoConnection) {
        this.mongoConnection = mongoConnection;
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
            .collection("dummyStrings");
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
        if((await this.getCacheSize()) == MAX_SIZE) {
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

}

module.exports = CacheModel;