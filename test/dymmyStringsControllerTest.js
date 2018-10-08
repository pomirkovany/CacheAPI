const tap = require('tap');
const sinon = require('sinon');
const DummyStringsService = require('../src/components/dummyStrings/dummyStringsService');
const CacheModel = require('../src/components/dummyStrings/cacheModel');
const DummyStringsController = require('../src/components/dummyStrings/DummyStringsController');

const MongoConnectionMock = require('./mock/mongoConnectionMock');


tap.test("getDummyString should return cached or random string depending on hit", async childTest => {

    const cacheModel = new CacheModel(new MongoConnectionMock());
    const dummyStringsService = new DummyStringsService(cacheModel);
    const dummyStringsController = new DummyStringsController(dummyStringsService);

    const send = sinon.spy();
    const res = {send};
    let req = {params: {key: "test1"} };

    await dummyStringsController.getDummyString(req, res);

    tap.equal("dummy1", send.getCall(0).args[0].result);

    req = {params: {key: "test2"} };
    send.resetHistory();

    await dummyStringsController.getDummyString(req, res);

    const response = send.getCall(0).args[0];
    tap.equal(typeof response.result, 'string');
    tap.equal(5, response.result.length);

    childTest.end();
});

tap.test("updateDummyString should set 404 response status if req has no body", async childTest => {

    const cacheModel = new CacheModel(new MongoConnectionMock());
    const dummyStringsService = new DummyStringsService(cacheModel);
    const dummyStringsController = new DummyStringsController(dummyStringsService);

    const status = sinon.spy()
    const send = sinon.spy();
    const res = {send, status};
    const req = {params: {key: "test1"} };

    await dummyStringsController.updateDummyString(req, res);

    tap.equal("New value is required for updating the cache by key!", send.getCall(0).args[0]);
    tap.equal(400, status.getCall(0).args[0]);

    childTest.end();
});

tap.test("updateDummyString should set appropriate response status depending on update result", async childTest => {

    const cacheModel = new CacheModel(new MongoConnectionMock());
    const dummyStringsService = new DummyStringsService(cacheModel);
    const dummyStringsController = new DummyStringsController(dummyStringsService);

    const status = sinon.spy()
    const send = sinon.spy();
    const res = {send, status};
    const req = {params: {key: "test1"}, body: {newValue: "newVal"}};

    await dummyStringsController.updateDummyString(req, res);

    tap.equal(undefined, send.getCall(0).args[0]);
    tap.equal(201, status.getCall(0).args[0]);

    send.resetHistory();
    status.resetHistory();

    await dummyStringsController.updateDummyString(req, res);

    tap.equal(undefined, send.getCall(0).args[0]);
    tap.equal(204, status.getCall(0).args[0]);

    childTest.end();
});