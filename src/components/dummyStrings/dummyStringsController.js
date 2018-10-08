class DummyStringsController {

    constructor(service) {
        this.dummyStringsService = service;
        this.getDummyString = this.getDummyString.bind(this);
        this.updateDummyString = this.updateDummyString.bind(this);
        this.deleteByKey = this.deleteByKey.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
        this.getAllKeys = this.getAllKeys.bind(this);
    }

    /**
     * GET /dummy-strings/:key
     * Sends response with value from cache
     * in case of cache hit or generates new dummy string in case
     * of cache miss
     *
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    async getDummyString(req, res, next) {
        try {
            const result = await this.dummyStringsService.getDummyString(req.params.key);
            res.send({result});
        } catch (e) {
            next(e);
        }
    }

    /**
     * GET /dummy-strings/keys
     * Retrieves all keys stored in cache
     *
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    async getAllKeys(req, res, next) {
        try {
            const result = await this.dummyStringsService.getAllKeys();
            res.send({result});
        } catch (e) {
            next(e);
        }
    }

    /**
     * PUT /dummy-strings/:key
     * Updates cache by key with value from body
     *
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    async updateDummyString(req, res, next) {
        try {
            if(!req.body) {
                res.status(400);
                res.send("New value is required for updating the cache by key!");
                return;
            }
            const updatedExisting = await this.dummyStringsService.updateByKey(req.params.key, req.body.newValue);
            res.status(updatedExisting ? 204 : 201);
            res.send();
        } catch (e) {
            next(e);
        }
    }

    /**
     * DELETE /dummy-strings/:key
     *
     * @param req
     * @param res
     * @param next
     * @returns {Promise<void>}
     */
    async deleteByKey(req, res, next) {
        try {
            const deletedCount = await this.dummyStringsService.removeByKey(req.params.key);
            res.status(deletedCount === 0 ? 404 : 204);
            res.send();
        } catch(e) {
            next(e);
        }
    }

    /**
     * DELETE /dummy-strings/
     *
     * Deletes all items from the cache
     *
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    async deleteAll(req, res, next) {
        try {
            const deletedCount = await this.dummyStringsService.removeAll();
            res.status(deletedCount === 0 ? 404 : 204);
            res.send();
        } catch (e) {
            next(e);
        }

    }

}

module.exports = DummyStringsController;