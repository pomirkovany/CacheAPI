class DummyStringsController {

    constructor(service) {
        this.dummyStringsService = service;
        this.getDummyString = this.getDummyString.bind(this);
        this.updateDummyString = this.updateDummyString.bind(this);
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

}

module.exports = DummyStringsController;