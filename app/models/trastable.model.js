const mongoose = require("mongoose");
const $baseModel = require("./$baseModel");

const friendsSchema = new mongoose.Schema({
    requester: { type: Number, ref: 'user' },
    recipient: { type: Number, ref: 'user' },
    status: {
        type: String,
        enums: [

            'pending',
            'accepted',
            'canceld',

        ]
    }
}, { timestamps: true })

const response = (doc) => {
    return {
        id: doc.id,
        requester: doc.requester,
        recipient: doc.recipient,
        status: doc.status,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
    };
};
module.exports = $baseModel("trastable", friendsSchema, {
    responseFunc: response,
    // here you can add any option with in baseSchema
});
