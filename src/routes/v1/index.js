'use strict';

const Route = require('koa-router');

const ridesRouter = require('./rides');

const router = new Route({ prefix: '/api/v1' });

router.use(ridesRouter);

module.exports = router;
