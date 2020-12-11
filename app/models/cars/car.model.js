const mongoose = require("mongoose");
const RandExp = require("randexp");
const notificationService = require("../../services/notification");
const $baseModel = require("../$baseModel");

// // RegExp rules
// // const usernameRules = /^[a-zA-Z][a-zA-Z0-9]{4,19}$/;
// const passwordRules = /^.{6,}$/;
// const emailRules = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// const phoneRules = /^\+201[0125][0-9]{8}$/;
// // https://regexr.com/3c53v

const schema = new mongoose.Schema(
    {
        carType: {
            type: String,
            enum: ["bus", "private"],
            required: true,
        },
        carNumber: {
            type: String,
            required: true,
        },
        transportType: {
            type: String,
            enum: ["public", "travel"],
        },
        carPhoto: {
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
            default: false,
        },
        code: {
            type: String,
        },
        qrCode: {
            type: String,
        },

    },
    { timestamps: true, discriminatorKey: "transportType" }
);

const response = (doc, options) => {
    return {
        id: doc.id,
        carType: doc.carType,
        photo: doc.photo,
        carNumber: doc.carNumber,
        carPhoto: doc.carPhoto,
        enabled: doc.enabled,
        transportType: doc.transportType,
        code: doc.code,
        qrCode: doc.qrCode,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
    };
};

schema.methods.sendNotification = async function (message) {
    let changed = false;
    let len = this.pushTokens.length;
    console.log("1");
    while (len--) {
        console.log("2");
        const deviceToken = this.pushTokens[len].deviceToken;
        try {
            await notificationService.sendNotification(deviceToken, message);
            console.log("successfully");
        } catch (error) {
            console.log(error);
            this.pushTokens.splice(len, 1);
            changed = true;
        }
    }
    if (changed) await this.save();
};
module.exports = $baseModel("car", schema, {
    responseFunc: response,
    // here you can add any option with in baseSchema
});
