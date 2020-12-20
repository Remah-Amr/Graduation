const mongoose = require("mongoose");
const $baseModel = require("./$baseModel");

const schema = new mongoose.Schema(
    {
        user: {
            type: Number,
            ref: 'user'
        },
        car: {
            type: Number,
            ref: 'car'
        },
        cost: {
            type: Number,
        },
        seatNumber: [
            {
                type: Number
            }
        ]

    },
    { timestamps: true }
);

const response = (doc) => {
    return {
        id: doc.id,
        user: doc.user,
        car: doc.car,
        cost: doc.cost,
        seatNumber: doc.seatNumber,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
    };
};

module.exports = $baseModel("transaction", schema, {
    responseFunc: response
});
