const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    teamName: {
        type: String,
        requied: true
    },
    players: [Object],
    goalies: [Object],
    wins: Number,
    losses: Number

},{timestamps: true});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;