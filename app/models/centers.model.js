const mongoose = require("mongoose");
const $baseModel = require("./$baseModel");


const schema = new mongoose.Schema(
    {
        address: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);

const response = (doc) => {
    return {
        id: doc.id,
        address: doc.address,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
    };
};

module.exports = $baseModel("center", schema, {
    responseFunc: response
});
