'use strict';

(async function() {
    const Koa = require('koa');
    const respond = require('koa-respond');
    const bodyparser = require('koa-bodyparser');
    const helmet = require('koa-helmet');
    const logger = require('koa-pino-logger');

    const getConfig = require('./config/get-config');
    const { initDBConnection } = require('./utils');
    const attachRouting = require('./routes');

    const app = new Koa();
    const PORT = getConfig('PORT');

    try {
        await initDBConnection();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    app.use(bodyparser())
        .use(respond())
        .use(helmet())
        .use(logger());

    await attachRouting(app);

    app.use(async (ctx, next) => {
        console.error(ctx.error);
        await next();
    });

    app.listen(PORT, () => {
        console.info(`The server is running at http://localhost:${PORT}/`);
    });
})();
