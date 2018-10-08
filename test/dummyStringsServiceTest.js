const tap = require('tap');
const sinon = require('sinon');
const DummyStringsService = require('../src/components/dummyStrings/dummyStringsService');
const CacheModel = require('../src/components/dummyStrings/cacheModel');
const MongoConnectionMock = require('./mock/mongoConnectionMock');

tap.test("static getRandomString should return random string", childTest => {
    const randomString = DummyStringsService.getRandomString();

    tap.equal(typeof randomString, 'string');
    tap.equal(5, randomString.length);

    childTest.end();
});

tap.test("getDummyString should return value from cache or random string", async childTest => {
    const cacheModel = new CacheModel(new MongoConnectionMock());
    const dummyStringsService = new DummyStringsService(cacheModel);

    const cacheHitResult = await dummyStringsService.getDummyString("test1");
    childTest.equal(cacheHitResult, "dummy1");

    const cacheMissResult = await dummyStringsService.getDummyString("missingKey");
    childTest.notEqual(cacheMissResult, "dummy1");
    tap.equal(typeof cacheMissResult, 'string');
    tap.equal(5, cacheMissResult.length);

    childTest.end();
});