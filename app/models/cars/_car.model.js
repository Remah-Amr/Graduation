const mongoose = require("mongoose");
const $baseModel = require("../$baseModel");

const schema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["bus", "taxi"],
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    numberOfSeats: {
      type: Number,
    },
    photo: {
      type: String,
      default:
        "https://res.cloudinary.com/derossy-backup/image/upload/v1555206304/deross-samples/placeholder-profile-male.jpg",
    },
    owner: {
      type: Number,
      ref: "owner",
    },
    enabled: {
      type: Boolean,
      default: true,
    },
    code: {
      type: String,
    },
    qrCode: {
      type: String,
    },
    current_driver: {
      type: Number,
      ref: "user",
    },
    current_journey: {
      type: Number,
      ref: "journey",
    },
  },
  { timestamps: true, discriminatorKey: "transportType" }
);

const response = (doc) => {
  return {
    id: doc.id,
    type: doc.type,
    owner: doc.owner,
    current_driver: doc.current_driver,
    current_journey: doc.current_journey,
    photo: doc.photo,
    number: doc.number,
    numberOfSeats: doc.numberOfSeats,
    enabled: doc.enabled,
    gove1: doc.gove1,
    gove2: doc.gove2,
    from: doc.gove1,
    to: doc.gove2,
    station: doc.station,
    transportType: doc.transportType,
    code: doc.code,
    qrCode: doc.qrCode,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
};

module.exports = $baseModel("car", schema, {
  responseFunc: response,
});
