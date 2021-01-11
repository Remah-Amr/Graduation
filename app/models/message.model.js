const mongoose = require("mongoose");
const $baseSchema = require("./$baseSchema");
const $baseModel = require("./$baseModel");

const schema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
    attachment: {
      type: String,
    },
    user: {
      type: Number,
      ref: "user",
      required: true,
    },
    conversation: {
      type: Number,
      ref: "conversation",
      required: true,
    },
  },
  { timestamps: true }
);

const response = (doc) => {
  return {
    id: doc.id,
    content: doc.content,
    attachment: doc.attachment,
    user: doc.user,
    conversation: doc.conversation,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
};

schema.plugin(require("mongoose-autopopulate"));

module.exports = $baseModel("message", schema, {
  responseFunc: response,
});
