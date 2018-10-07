class DummyStringsController {

    constructor(service) {
        this.dummyStringsService = service;
        this.getDummyString = this.getDummyString.bind(this);
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

}

module.exports = DummyStringsController;