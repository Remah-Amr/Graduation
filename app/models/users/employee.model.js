const mongoose = require("mongoose");
const UserModel = require("./_user.model");

const schema = new mongoose.Schema({
    center: {
        type: Number,
        ref: 'center'
    },

}, { discriminatorKey: "role" });

module.exports = UserModel.discriminator("employee", schema);
