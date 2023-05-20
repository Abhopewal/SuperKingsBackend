const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
    gameName: {
        type: String,
        required: true,
        unique: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    timeZone: {
        type: String,
        default:"GMT+5:30"
    }
}, { timestamps: true });

let Game = new mongoose.model("Game", GameSchema);

module.exports = Game;