'use strict';

const defaultEnvVariables = {
    PORT: 4000,
    MONGO_HOST: 'localhost',
    MONGO_PORT: 27017,
    MONGO_DB: 'geonear-demo',
    MONGO_USERNAME: '',
    MONGO_PASSWORD: ''
};

module.exports = key => {
    return process.env[key] || defaultEnvVariables[key];
};
