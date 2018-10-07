class DummyStringsController {

    constructor(service) {
        this.dummyStringsService = service;
        this.getDummyString = this.getDummyString.bind(this);
    }
    
    async getDummyString(req, res, next) {
        console.log("test");
    }

}

module.exports = DummyStringsController;