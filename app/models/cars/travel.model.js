const mongoose = require("mongoose");
const CarModel = require("./_car.model");

const schema = new mongoose.Schema(
    {

        from: {
            type: Number,
            ref: "Governorate"
        },
        to: {
            type: Number,
            ref: "Governorate"
        }
    },
    { discriminatorKey: "transportType" }
);
module.exports = CarModel.discriminator("travel", schema);