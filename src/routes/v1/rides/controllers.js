'use strict';

const { DriversModel, UsersModel, OrdersModel } = require('models');

class RidesControllers {
    async request(ctx, next) {
        const { from, to } = ctx.request.body;

        try {
            const drivers = await DriversModel.aggregate([
                {
                    $geoNear: {
                        near: {
                            type: 'Point',
                            coordinates: [+from[0], +from[1]]
                        },
                        distanceField: 'dist.calculated',
                        maxDistance: 5000,
                        spherical: true,
                        num: 1
                    }
                },
                {
                    $match: {
                        available: true
                    }
                },
                {
                    $project: {
                        name: '$name',
                        location: '$location.coordinates',
                        distance: '$dist.calculated'
                    }
                }
            ]);

            if (drivers.length) {
                const user = await UsersModel.findOne({});
                await OrdersModel.create({
                    from,
                    to,
                    user: user._id,
                    driver: drivers[0]._id
                });
                ctx.ok(drivers[0]);
            } else ctx.notFound('Ride not available');
        } catch (error) {
            ctx.error = error;
            await next();
        }
    }

    async history(ctx) {
        ctx.ok(
            await OrdersModel.aggregate([
                {
                    $sort: {
                        createdAt: -1
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'user',
                        foreignField: '_id',
                        as: 'user'
                    }
                },
                {
                    $lookup: {
                        from: 'drivers',
                        localField: 'driver',
                        foreignField: '_id',
                        as: 'driver'
                    }
                },
                {
                    $project: {
                        _id: 0,
                        from: 1,
                        to: 1,
                        createdAt: 1,
                        'user.name': 1,
                        'driver.name': 1
                    }
                }
            ])
        );
    }

    async nearby(ctx, next) {
        const { lat, lng } = ctx.request.query;

        try {
            const drivers = await DriversModel.aggregate([
                {
                    $geoNear: {
                        near: {
                            type: 'Point',
                            coordinates: [+lng, +lat]
                        },
                        distanceField: 'dist.calculated',
                        maxDistance: 5000,
                        spherical: true
                    }
                },
                {
                    $match: {
                        available: true
                    }
                },
                {
                    $project: {
                        _id: 0,
                        name: '$name',
                        location: '$location.coordinates',
                        distance: '$dist.calculated'
                    }
                }
            ]);

            if (drivers.length) ctx.ok(drivers);
            else ctx.notFound('Ride not available');
        } catch (error) {
            ctx.error = error;
            await next();
        }
    }
}

module.exports = new RidesControllers();
