'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrdersSchema = new Schema(
    {
        from: {
            type: Array,
            required: true
        },
        to: {
            type: Array,
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            required: true
        },
        driver: {
            type: Schema.Types.ObjectId,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Order = mongoose.model('order', OrdersSchema);

module.exports = Order;
