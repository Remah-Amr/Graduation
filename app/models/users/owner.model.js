const mongoose = require("mongoose");
const UserModel = require("./_user.model");

const schema = new mongoose.Schema({
    car: {
        type: Number,
        ref: 'car'
    },
    current_journey:{
        type:Number,
        ref: 'journey'
    }
}, { discriminatorKey: "role" });
module.exports = UserModel.discriminator("owner", schema);
