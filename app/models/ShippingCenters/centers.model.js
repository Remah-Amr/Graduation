const mongoose = require("mongoose");
const RandExp = require("randexp");
const notificationService = require("../../services/notification");
const $baseModel = require("../$baseModel");


const schema = new mongoose.Schema(
    {
        centerName: {
            type: String,
            required: true,
        },
        centerNumber: {
            type: String,
            required: true,
        },
        enabled: {
            type: Boolean,
            default: false,
        },
        code: {
            type: String,
        },

    },
    { timestamps: true }
);

const response = (doc, options) => {
    return {
        id: doc.id,
        centerName: doc.centerName,
        centerNumber: doc.centerNumber,
        enabled: doc.enabled,
        code: doc.code,
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
module.exports = $baseModel("center", schema, {
    responseFunc: response,
    // here you can add any option with in baseSchema
});
