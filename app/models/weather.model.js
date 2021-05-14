const mongoose = require("mongoose");
const $baseModel = require("./$baseModel");

const schema = new mongoose.Schema(
  {
    current: {
      clouds: Number,
      dew_point: Number,
      dt: Number,
      feels_like: Number,
      humidity: Number,
      pressure: Number,
      sunrise: Date,
      sunset: Date,
      temp: Number,
      uvi: Number,
      visibility: Number,
      wind_deg: Number,
      wind_speed: Number,
      weather: [
        {
          _id: false,
          description: String,
          icon: String,
          id: Number,
          main: String,
        },
      ],
    },
    lat: Number,
    lon: Number,
    timezone: String,
    timezone_offset: Number,
    daily: [
      {
        _id: false,
        clouds: Number,
        dew_point: Number,
        dt: Date,
        humidity: Number,
        moon_phase: Number,
        moonrise: Number,
        moonset: Number,
        pop: Number,
        pressure: Number,
        sunrise: Date,
        sunset: Number,
        wind_deg: Number,
        wind_gust: Number,
        wind_speed: Number,
        uvi: Number,
        temp: {
          day: Number,
          eve: Number,
          max: Number,
          min: Number,
          morn: Number,
          night: Number,
        },
        weather: [
          {
            _id: false,
            description: String,
            icon: String,
            id: Number,
            main: String,
          },
        ],
      },
    ],
    circumstance: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
      enum: ["good", "middle", "danger"],
    },
    countOfClearStatus: Number,
    countOfRainStatus: Number,
    countOfCloudsStatus: Number,
  },
  { timestamps: true }
);

const response = (doc) => {
  return {
    id: doc.id,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
};

module.exports = $baseModel("weather", schema, {
  responseFunc: response,
});
