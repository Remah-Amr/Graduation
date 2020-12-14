const mongoose = require("mongoose");
const UserModel = require("./_user.model");

const schema = new mongoose.Schema({
    car: {
        type: Number,
        ref: 'car'
    },

}, { discriminatorKey: "role" });
module.exports = UserModel.discriminator("owner", schema);
