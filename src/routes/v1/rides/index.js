'use strict';

const Router = require('koa-router');

const { validateRequesteRideBody, validateNearbyRidesQuery } = require('middlewares');
const RidesControllers = require('./controllers');

const router = new Router({ prefix: '/rides' });

// POST /api/v1/rides/request
router.post('/request', validateRequesteRideBody, RidesControllers.request);

// GET /api/v1/rides/history
router.get('/history', RidesControllers.history);

// GET /api/v1/rides/nearby
router.get('/nearby', validateNearbyRidesQuery, RidesControllers.nearby);

module.exports = router.routes();
