const mongoose = require("mongoose");
const $baseModel = require("../$baseModel");

const schema = new mongoose.Schema(
    {
        sender: {
            type: Number,
            ref: 'user'
        },
        receiver: {
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
        sender: doc.sender,
        receiver: doc.receiver,
        cost: doc.cost,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
    };
};

module.exports = $baseModel("tbalanceTransfer", schema, {
    responseFunc: response
});
