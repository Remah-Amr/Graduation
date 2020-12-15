const mongoose = require("mongoose");
const $baseModel = require("./$baseModel");

const schema = new mongoose.Schema(
    {
        driver: {
            type: Number,
            ref: 'user'
        },
        car: {
            type: Number,
            ref: 'car'
        },
        transactions: [
            {
                type: Number,
                ref: 'transaction'
            }
        ],
        status:{
            type: String,
            enum:['start','end'],
            default: 'start'
        }
    },
    { timestamps: true }
);
const response = (doc) => {
    return {
        id: doc.id,
        driver: doc.driver,
        car: doc.car,
        transactions: doc.transactions,
        status: doc.status,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
    };
};

module.exports = $baseModel("journey", schema, {
    responseFunc: response,
    // here you can add any option with in baseSchema
});
