let Game = require('./models/Game');
const mongoose = require('mongoose');
const moment = require('moment');

require('dotenv').config();


//connect mongoDB
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then(()=>{
    console.log("Database connected!")

    const newGame = new Game({
        homeTeamName: "Team RC",
        awayTeamName: "Team Bryan",
        score: {
                game1: {home: 3, away: 5},
                game2: {home:5, away: 4},
                game3: {home:1, away: 5},
                game4: {home:5, away: 2},
            },
        goalsScoredBy: {
                player1:{first: "Takato", last: "Cox", goals: 3},  
                player2:{first: "Campbell", last: "Jackson", goals: 4},
                player3:{first: "Tristin", last: "Peterson", goals: 2}
            }, 
        goalies:{
                goalie1:{first: "Christian", last: "Ross", wins: 3}, 
                goalie2:{first: "Chad", last: "Unknown", wins: 1}
            },
        date: moment().format('ll')
    })
        newGame.save()
        .then(console.log("Game added to database"))
        .catch(err=>{
            console.log("Error dummy" + err);
        })
})
.catch(err=>{console.log(`DB Connection Error: ${err.message}`)});

