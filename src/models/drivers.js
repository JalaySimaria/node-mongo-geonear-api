'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GeoSchema = new Schema(
    {
        type: {
            type: String,
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        }
    },
    {
        _id: false
    }
);

const DriverSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name field is required']
        },
        available: {
            type: Boolean,
            default: false
        },
        location: GeoSchema
    },
    {
        timestamps: true
    }
);

const Driver = mongoose.model('driver', DriverSchema);

module.exports = Driver;
