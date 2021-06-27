const mongoose = require("mongoose");
const $baseModel = require("./$baseModel");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    hobbies: [
      {
        type: String,
      },
    ],
    cost: Number,
    isValid: Boolean,
  },
  { timestamps: true }
);

const response = (doc) => {
  return {
    id: doc.id,
    name: doc.name,
    hobbies: doc.hobbies,
    cost: doc.cost,
    isValid: doc.isValid,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
};

module.exports = $baseModel("test", schema, {
  responseFunc: response,
});
