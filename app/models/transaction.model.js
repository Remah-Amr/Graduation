const mongoose = require("mongoose");
const $baseModel = require("./$baseModel");

const schema = new mongoose.Schema(
  {
    user: {
      type: Number,
      ref: "user",
    },
    driver: {
      type: Number,
      ref: "user",
      required: true,
    },
    car: {
      type: Number,
      ref: "car",
    },
    cost: {
      type: Number,
    },
    seatNumber: [
      {
        type: Number,
      },
    ],
  },
  { timestamps: true }
);

const response = (doc) => {
  return {
    id: doc.id,
    user: doc.user,
    driver: doc.driver,
    car: doc.car,
    cost: doc.cost,
    seatNumber: doc.seatNumber,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
};

module.exports = $baseModel("transaction", schema, {
  responseFunc: response,
});
