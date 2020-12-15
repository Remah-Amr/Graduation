const mongoose = require("mongoose");
const $baseModel = require("../$baseModel");

const schema = new mongoose.Schema(
    {
        type: {
            type: String,
            enum: ["bus", "private"],
            required: true,
        },
        number: {
            type: String,
            required: true,
        },
        photo: {
            type: String,
            default:
                "https://res.cloudinary.com/derossy-backup/image/upload/v1555206304/deross-samples/placeholder-profile-male.jpg",
        },
        owner: {
            type: Number,
            ref: 'owner'
        },
        enabled: {
            type: Boolean,
            default: true,
        },
        code: {
            type: String,
        },
        qrCode: {
            type: String,
        },
        current_driver: {
            type: Number,
            ref: 'user'
        },
        current_journey: {
            type: Number,
            ref: 'journey'
        },


    },
    { timestamps: true, discriminatorKey: "transportType" }
);

const response = (doc) => {
    return {
        id: doc.id,
        type: doc.type,
        owner: doc.owner,
        current_driver: doc.current_driver,
        current_journey: doc.current_journey,
        photo: doc.photo,
        number: doc.number,
        enabled: doc.enabled,
        transportType: doc.transportType,
        code: doc.code,
        qrCode: doc.qrCode,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
    };
};

module.exports = $baseModel("car", schema, {
    responseFunc: response
});