const mongoose = require("mongoose");
const $baseModel = require("./$baseModel");

const schema = new mongoose.Schema(
    {
        name: { type: Number },
        location: lcoationSchema(),
    },
    { timestamps: true }
);

const response = (doc) => {
    return {
        id: doc.id,
        name: doc.name,
        location: doc.location,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
    };
};
module.exports = $baseModel("location", schema, {
    responseFunc: response,
});

function lcoationSchema() {
    const schema = new mongoose.Schema(
        {
            type: {
                type: String,
            },
            coordinates: [],
        },
        { _id: false }
    );

    schema.set("toJSON", {
        transform: function (doc, ret) {
            return {
                type: doc.type,
                coordinates: doc.coordinates,
            };
        },
    });

    return schema;
}
