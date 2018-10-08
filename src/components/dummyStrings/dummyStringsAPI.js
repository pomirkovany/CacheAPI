const express = require('express');
const router = express.Router();

module.exports = (dummyStringsController) => {
    router.get('/', dummyStringsController.getAllKeys);
    router.get('/:key', dummyStringsController.getDummyString);
    router.put('/:key', dummyStringsController.updateDummyString);
    router.delete('/:key', dummyStringsController.deleteByKey);
    router.delete('/', dummyStringsController.deleteAll);
    return router;
};