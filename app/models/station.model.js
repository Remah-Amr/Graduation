const mongoose = require("mongoose");
const CarModel = require("./cars/_car.model");
const $baseModel = require("./$baseModel");

const schema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        gov1: {
            type: Number,
            ref: "Governorate"
        },
        gov2: {
            type: Number,
            ref: "Governorate"
        },


        carsLine: [
            {
                type: Number,
                ref: 'car'
            }
        ],

        availableCarGoev1: {
            gove1: {
                type: Number,
                ref: "Governorate"
            },
            cars: [
                {
                    type: Number,
                    ref: 'car'
                }
            ],

        },
        availableCarGoev2: {
            gove2: {
                type: Number,
                ref: "Governorate"
            },
            cars: [
                {
                    type: Number,
                    ref: 'car'
                }
            ],
        }
    },

);

module.exports = $baseModel("station", schema);
