const mongoose = require("mongoose");
const $baseModel = require("./$baseModel");

const schema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
    photo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const response = (doc) => {
  return {
    id: doc.id,
    content: doc.content,
    photo: doc.photo,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
};

module.exports = $baseModel("advertisment", schema, {
  responseFunc: response,
});
