const mongoose = require("mongoose");
const $baseModel = require("../$baseModel");

const schema = new mongoose.Schema(
    {
        nameAr: {
            type: String
        },
        nameEn: {
            type: String
        },
    },
    { timestamps: true }
);
const response = (doc) => {
    return {
        id: doc.id,
        nameAr: doc.nameAr,
        nameEn: doc.nameEn,
    };
};

module.exports = $baseModel("Governorate", schema, {
    responseFunc: response,
    // here you can add any option with in baseSchema
});
