const mongoose = require("mongoose");
const UserModel = require("./_user.model");
const nationalIdRule =
  /(2|3)[0-9][0-9][0-1][0-9][0-3][0-9](01|02|03|04|11|12|13|14|15|16|17|18|19|21|22|23|24|25|26|27|28|29|31|32|33|34|35|88)\d\d\d\d\d/;

const schema = new mongoose.Schema(
  {
    current_car: {
      type: Number,
      ref: "car",
    },
    current_journey: {
      type: Number,
      ref: "journey",
    },
    nationalId: {
      type: String,
      match: nationalIdRule,
    },
    cars: [
      {
        type: Number,
        ref: "car",
      },
    ],
    rating: {
      type: Number,
      default: 0,
    },
    driverType: {
      type: String,
      enum: ["travel", "public"],
    },
  },
  { discriminatorKey: "role" }
);
module.exports = UserModel.discriminator("owner", schema);
