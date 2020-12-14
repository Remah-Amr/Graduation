const mongoose = require("mongoose");
const CarModel = require("./_car.model");

const schema = new mongoose.Schema(
    {
        travelLine: {
            from: { type: String },
            to: { type: String },
            // from to Ex => from  arish to alex
        },
    },
    { discriminatorKey: "transportType" }
);
module.exports = CarModel.discriminator("public", schema);