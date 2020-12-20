const mongoose = require("mongoose");
const $baseModel = require("./$baseModel");

const schema = new mongoose.Schema(
  {
    subject: {
      type: Number,
      refPath: "subjectType",
      required: true,
    },
    subjectType: {
      type: String,
      enum: ["user"],
      required: true,
    },
    car: {
      type: Number,
      ref: 'car'
    },
    user: {
      type: Number,
      ref: "user",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    feedback: {
      type: String,
    },
  },
  { timestamps: true }
);

const response = (doc) => {
  return {
    id: doc.id,
    user: doc.user,
    car: doc.car,
    rating: doc.rating,
    subject: doc.subject,
    subjectType: doc.subjectType,
    feedback: doc.feedback,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
};

module.exports = $baseModel("rate", schema, {
  responseFunc: response,
});
