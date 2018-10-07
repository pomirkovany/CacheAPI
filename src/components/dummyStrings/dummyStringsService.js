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
     * Returns 5 char long random string
     *
     * @returns {string}
     */
    static getRandomString() {
        return Math.random().toString(36).slice(-5);
    }
}

module.exports = DummyStringsService;