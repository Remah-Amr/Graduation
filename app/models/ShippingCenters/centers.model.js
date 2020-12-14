const mongoose = require("mongoose");
const RandExp = require("randexp");
const notificationService = require("../../services/notification");
const $baseModel = require("../$baseModel");


const schema = new mongoose.Schema(
    {
        address: {
            type: String,
            required: true,
        },

        code: {
            type: String,
        },
        enabled: {
            type: Boolean,
            default: true,
        },

    },
    { timestamps: true }
);

const response = (doc, options) => {
    return {
        id: doc.id,
        address: doc.address,
        code: doc.code,
        enabled: doc.enabled,
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
