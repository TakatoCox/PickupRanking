const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    homeTeamName: String,
    awayTeamName: String,
    score: Object,
    date: String
},{timestamps: true});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;