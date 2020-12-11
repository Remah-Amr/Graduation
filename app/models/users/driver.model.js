const mongoose = require("mongoose");
const UserModel = require("./_user.model");

const schema = new mongoose.Schema({
    collecting: {
        type: Boolean,
        default: false
    },
    tripNumber: {
        type: Number,
        default: 0
    },
    car: {
        type: Number,
        ref: 'car'
    },
    owner: {
        type: Number,
        ref: 'owner'
    },


}, { discriminatorKey: "role" });
module.exports = UserModel.discriminator("driver", schema);
