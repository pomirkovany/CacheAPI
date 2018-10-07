const express = require('express');
const router = express.Router();

module.exports = (dummyStringsController) => {
    router.get('/:key', dummyStringsController.getDummyString);
    return router;
};