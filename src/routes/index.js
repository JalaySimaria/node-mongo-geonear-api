'use strict';

const glob = require('glob');

function getAllRoutes() {
    return new Promise((resolve, reject) => {
        const routes = [];
        glob(`${__dirname}/*/index.js`, (err, files) => {
            if (err) {
                return reject(err);
            }
            files.forEach(file => {
                routes.push(require(file));
            });
            return resolve(routes);
        });
    });
}

module.exports = async app => {
    return new Promise(async (resolve, reject) => {
        const routes = await getAllRoutes();
        routes.forEach(route => {
            app.use(route.routes()).use(route.allowedMethods({ throw: true }));
        });
        resolve();
    });
};
