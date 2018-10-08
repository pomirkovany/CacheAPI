class DummyStringsService {
    constructor(model) {
        this.model = model;
    }

    /**
     * Retrieves value from cache or generates new
     * one in case of cache miss
     *
     * @param key
     * @returns {Promise<*>}
     */
    async getDummyString(key) {
        let dummyStr = await this.model.getByKey(key);

        if(!dummyStr) {
            console.log("Cache miss");
            dummyStr = DummyStringsService.getRandomString();
            await this.model.insert(key, dummyStr);
        } else {
            console.log("Cache hit");
        }
        return dummyStr;
    }

    /**
     *
     * @param key
     * @param newItem
     * @returns {Promise<*>}
     */
    async updateByKey(key, newItem) {
        return await this.model.updateByKey(key, newItem);
    }

    /**
     *
     * @param key
     * @param newItem
     * @returns {Promise<*>}
     */
    async getAllKeys() {
        return await this.model.getAllKeys();
    }


    /**
     *
     * @param key
     * @returns {Promise<*>}
     */
    async removeByKey(key) {
        return await this.model.removeByKey(key);
    }

    /**
     *
     * @param key
     * @returns {Promise<*>}
     */
    async removeAll(key) {
        return await this.model.removeAll();
    }

    /**
     * Returns 5 char long random string
     *
     * @returns {string}
     */
    static getRandomString() {
        return Math.random().toString(36).slice(-5);
    }
}

module.exports = DummyStringsService;