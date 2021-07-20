const mongoose = require("mongoose");
const $baseModel = require("../$baseModel");

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    user: {
      type: Number,
      ref: "user",
    },
    targetUsers: [
      {
        type: Number,
        ref: "user",
      },
    ],
    subjectType: {
      type: String,
      enum: ["admin"],
    },
    subject: {
      type: Number,
      refPath: "subjectType",
    },
    seen: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default:
        "https://res.cloudinary.com/derossy-backup/image/upload/v1555206853/deross-samples/notifications/bell.png",
    },
  },
  { timestamps: true }
);

schema.methods.toFirebaseNotification = function () {
  return {
    notification: {
      title: this.title,
      body: this.body,
    },
  };
};

const response = (doc) => {
  return {
    id: doc.id,
    title: doc.title,
    body: doc.body,
    titleAr: doc.titleAr,
    bodyAr: doc.bodyAr,
    titleEn: doc.titleEn,
    bodyEn: doc.bodyEn,
    icon: doc.icon,
    // targetUsers: doc.targetUsers,
    user: doc.user,
    type: doc.type,
    seen: doc.seen,
    subject: doc.subject,
    subjectType: doc.subjectType,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
};

module.exports = $baseModel("notification", schema, {
  responseFunc: response,
});
