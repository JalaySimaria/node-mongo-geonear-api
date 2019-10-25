'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name field is required'],
            unique: true
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('user', UsersSchema);

module.exports = User;
