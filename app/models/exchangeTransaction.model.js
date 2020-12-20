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
        center: {
            type: Number,
            ref: 'center'
        },
        employee: {
            type: Number,
            ref: 'user'
        },
        cost: {
            type: Number,
        }

    },
    { timestamps: true }
);

const response = (doc) => {
    return {
        id: doc.id,
        user: doc.user,
        car: doc.car,
        cost: doc.cost,
        center: doc.center,
        employee: doc.employee,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
    };
};

module.exports = $baseModel("exchangeTransaction", schema, {
    responseFunc: response
});
