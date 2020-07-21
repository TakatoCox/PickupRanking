const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    homeTeamName: String,
    awayTeamName: String,
    score: Object,
    goalsScoredBy: Object, 
    //{player1:{first: "" last: "", goals: num},  player2:{first: "" last: "", goals: num}}
    goalies:Object, //{goalie1:{first: "" last: "", wins: num}, goalie2{first: "" last: "", wins: num}}
    date: String
},{timestamps: true});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;