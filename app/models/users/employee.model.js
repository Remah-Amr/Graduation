const mongoose = require("mongoose");
const UserModel = require("./_user.model");

const schema = new mongoose.Schema({
    center: {
        type: Number,
        ref: 'center'
    },

}, { discriminatorKey: "role" });
const response = doc => {
    return {
        id: doc.id,
        // type: doc.type,
        center: doc.center,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt
    };
};
module.exports = UserModel.discriminator("employee", schema);
