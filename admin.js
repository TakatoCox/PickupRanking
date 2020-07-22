let Game = require('./models/Game');
const mongoose = require('mongoose');
const moment = require('moment');

require('dotenv').config();


//connect mongoDB
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
.then(()=>{
    console.log("Database connected!")

    const newGame = new Game({
        homeTeamName: "Black",
        awayTeamName: "White",
        score: {
                score:{home:0, away:2, DNF:1},
                allGames:{
                    game1:{home: 4, away:8},
                    game2:{home: 7, away:8},
                    game3:{home: 2, away:3}
                }
            },
        goalsScoredBy: {
                player1:{first: "Takato", last: "Cox", goals: 1},  
                player2:{first: "Campbell", last: "Jackson", goals: 3},
                player3:{first: "Tristin", last: "Peterson", goals: 2},
                player4:{first: "Tanner", last: "-", goals: 1},
                player5:{first: "Adam", last: "-", goals: 1},
                player6:{first: "Donovan", last: "-", goals: 1},
                player7:{first: "Mikus", last: "-", goals: 2},
                player8:{first: "Trey", last: "-", goals: 3},
                player9:{first: "Brian", last: "-", goals: 1},
                player10:{first: "Sam", last: "Gold", goals: 2},
            }, 
        goalies:{
                goalie1:{first: "Blake", last: "-", wins: 1, losses:1, DNF:1}, 
                goalie2:{first: "Chad", last: "-", wins: 1, losses:1, DNF:1}
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

