const mongoose = require("mongoose");
const $baseModel = require("./$baseModel");

const schema = new mongoose.Schema(
  {
    sender: { type: Number, ref: "user" },
    receiver: { type: Number, ref: "user" },
  },
  { timestamps: true }
);

const response = (doc) => {
  return {
    id: doc.id,
    sender: doc.sender,
    receiver: doc.receiver,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
};
module.exports = $baseModel("follow", schema, {
  responseFunc: response,
});
