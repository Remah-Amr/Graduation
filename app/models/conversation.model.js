const mongoose = require("mongoose");
const $baseSchema = require("./$baseSchema");
const $baseModel = require("./$baseModel");

// const deepPopulate = require('mongoose-deep-populate')(mongoose);

const schema = new mongoose.Schema(
  {
    users: [
      {
        type: Number,
        ref: "user",
      },
    ],
    meta: [metaSchema()],
    lastMessage: {
      type: Number,
      ref: "message",
      autopopulate: true,
    },
  },
  { timestamps: true }
);

const response = (doc) => {
  return {
    id: doc.id,
    users: doc.users,
    meta: doc.meta,
    lastMessage: doc.lastMessage,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
};

function metaSchema() {
  const schema = new mongoose.Schema(
    {
      user: {
        type: Number,
        ref: "user",
      },
      countOfUnseenMessages: {
        type: Number,
        default: 0,
      },
    },
    { _id: false }
  );

  schema.set("toJSON", {
    transform: function (doc) {
      return {
        user: doc.user,
        countOfUnseenMessages: doc.countOfUnseenMessages,
      };
    },
  });

  return schema;
}

schema.plugin(require("mongoose-autopopulate"));

module.exports = $baseModel("conversation", schema, {
  responseFunc: response,
});
