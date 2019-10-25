'use strict';

const mongoose = require('mongoose');

const getConfig = require('config/get-config');
const insertDummyData = require('./insert-dummy-data');

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);

function getURI() {
    const MONGO_HOST = getConfig('MONGO_HOST');
    const MONGO_PORT = getConfig('MONGO_PORT');
    const MONGO_DB = getConfig('MONGO_DB');
    const MONGO_USERNAME = getConfig('MONGO_USERNAME');
    const MONGO_PASSWORD = getConfig('MONGO_PASSWORD');

    return `mongodb://${
        MONGO_USERNAME && MONGO_PASSWORD ? `${MONGO_USERNAME}:${MONGO_PASSWORD}@` : ''
    }${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;
}

module.exports = () => {
    return new Promise((resolve, reject) => {
        mongoose
            .connect(getURI(), { useNewUrlParser: true, useUnifiedTopology: true })
            .then(async () => {
                await insertDummyData();
                resolve('Database connection established!');
            })
            .catch(err => {
                reject(`Failed to connect to Database. Error - ${err}`);
            });
    });
};
