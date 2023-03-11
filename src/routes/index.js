const express = require('express');

const { ApiHelper } = require('../helpers');
const testRouter = require('./test.route');

const router = express.Router();

router.get('/', (req, res) => {
    return ApiHelper.generateApiResponse(
        res,
        req,
        `App started successfully.`,
        200
    );
});

router.get('/status', (req, res) => {
    return ApiHelper.generateApiResponse(
        res,
        req,
        `${req.method} ${req.originalUrl} ` + `HTTP/${req.httpVersion}`,
        200
    );
});

router.use('/test', testRouter);

module.exports = router;
