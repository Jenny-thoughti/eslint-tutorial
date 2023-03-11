const express = require('express');

const { ApiHelper } = require('../helpers');

const router = express.Router();

router.get('/', (req, res) => {
    return ApiHelper.generateApiResponse(
        res,
        req,
        `${req.method} ${req.originalUrl} ` + `HTTP/${req.httpVersion}`,
        200
    );
});

module.exports = router;
