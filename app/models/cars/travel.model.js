const mongoose = require("mongoose");
const CarModel = require("./_car.model");

const schema = new mongoose.Schema(
    {

        gove1: {
            type: Number,
            ref: "Governorate"
        },
        gove2: {
            type: Number,
            ref: "Governorate"
        },
        station: {
            type: Number,
            ref: "station"

        }
    },
    { discriminatorKey: "transportType" }
);
module.exports = CarModel.discriminator("travel", schema);