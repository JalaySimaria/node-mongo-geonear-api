'use strict';

module.exports = {
    async validateRequesteRideBody(ctx, next) {
        const { from, to } = ctx.request.body;

        if (!Array.isArray(from) || !Array.isArray(to) || from.length !== 2 || to.length !== 2)
            return ctx.badRequest();

        await next();
    },

    async validateNearbyRidesQuery(ctx, next) {
        const { lat, lng } = ctx.request.query;

        if (!lat || !lng) return ctx.badRequest();

        await next();
    }
};
