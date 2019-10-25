'use strict';

const { DriversModel, UsersModel, OrdersModel } = require('models');

const dummyDrivers = [
    {
        available: true,
        name: 'driver 1',
        location: {
            type: 'point',
            coordinates: [-80, 25.791]
        }
    },
    {
        available: true,
        name: 'driver 2',
        location: {
            type: 'point',
            coordinates: [-80.245, 25.391]
        }
    },
    {
        available: true,
        name: 'driver 3',
        location: {
            type: 'point',
            coordinates: [-80.789, 25.701]
        }
    },
    {
        available: true,
        name: 'driver 4',
        location: {
            type: 'point',
            coordinates: [-82.589, 26.701]
        }
    },
    {
        available: true,
        name: 'driver 5',
        location: {
            type: 'point',
            coordinates: [-81.1, 24.95]
        }
    },
    {
        available: true,
        name: 'driver 6',
        location: {
            type: 'point',
            coordinates: [-79.789, 25.01]
        }
    }
];

module.exports = async () => {
    let drivers, user;

    if (!(await DriversModel.countDocuments({}))) {
        await DriversModel.deleteMany({});
        drivers = await DriversModel.insertMany(dummyDrivers);
    } else drivers = await DriversModel.find({});

    if (!(await UsersModel.countDocuments({}))) {
        await UsersModel.deleteMany({});
        user = await UsersModel.create({ name: 'user 1' });
    } else user = await UsersModel.findOne({});

    if (!(await OrdersModel.countDocuments({}))) {
        await OrdersModel.deleteMany({});
        await OrdersModel.create({
            from: [-80, 25.78],
            to: [-80, 25.785],
            user: user._id,
            driver: drivers[1]._id
        });
    }
};
