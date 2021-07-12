const mongoose = require("mongoose");
const $baseModel = require("./$baseModel");

const schema = new mongoose.Schema({
  name: {
    type: String,
  },
  gov1: {
    type: Number,
    ref: "Governorate",
  },
  gov2: {
    type: Number,
    ref: "Governorate",
  },

  carsLine: [
    {
      type: Number,
      ref: "car",
    },
  ],

  availableCarGoev1: {
    gove1: {
      type: Number,
      ref: "Governorate",
    },
    cars: [
      {
        type: Number,
        ref: "car",
      },
    ],
  },
  availableCarGoev2: {
    gove2: {
      type: Number,
      ref: "Governorate",
    },
    cars: [
      {
        type: Number,
        ref: "car",
      },
    ],
  },
});
const response = (doc) => {
  return {
    id: doc.id,
    name: doc.name,
    gov1: doc.gov1,
    gov2: doc.gov2,
    carsLine: doc.carsLine,
    availableCarGoev1: doc.availableCarGoev1,
    availableCarGoev2: doc.availableCarGoev2,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
};

module.exports = $baseModel("station", schema, {
  responseFunc: response,
});
