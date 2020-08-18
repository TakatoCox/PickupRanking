const router = require("express").Router();
let Team = require("../models/team");
let Game = require("../models/game");
var bodyParser = require("body-parser");
var parseUrlencoded = bodyParser.urlencoded({ extended: false });

///////////////////////Home/////////////////////////////
router.get("/", (req, res) => {
  let games = [];

  Game.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      games = [...result];
    })
    .then(() => {
      Team.find()
        .then((result) => {
          const teams = result.sort(function (a, b) {
            return b.wins - a.wins;
          });
          let arrPlayersSorted = [];
          result.map((team) => {
            arrPlayersSorted.push(...team.players);
          });
          const players = arrPlayersSorted.sort(function (a, b) {
            return b.goals - a.goals;
          });
          let arrGoalieSorted = [];
          result.map((team) => {
            arrGoalieSorted.push(...team.goalies);
          });
          const goalies = arrGoalieSorted.sort(function (a, b) {
            return b.wins - a.wins;
          });
          res.render("home", { teams, players, goalies, games });
        })
        .catch((err) => console.log(err));
    });
});

///////////////////////About/////////////////////////////
router.get("/about", (req, res) => {
  res.render("about");
});

///////////////////////Teams/////////////////////////////
router.post("/teams", parseUrlencoded, (req, res) => {
  const playerParse = JSON.parse(req.body.Players);
  const goalieParse = JSON.parse(req.body.Goalies);

  const newTeam = new Team({
    teamName: req.body.TeamName,
    players: playerParse,
    goalies: goalieParse,
    wins: 0,
    losses: 0,
    PTS: 0,
  });

  newTeam
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
});

router.get("/teams", (req, res) => {
  Team.find()
    .then((result) => {
      const winsSorted = result.sort((a, b) => {
        return b.wins - a.wins;
      });
      res.render("teams", { winsSorted });
    })
    .catch((err) => console.log(err));
});
///////////////////////Stats Page/////////////////////////////
router.get("/stats", (req, res) => {
  Team.find()
    .then((result) => {
      let arrPlayersSorted = [];
      result.map((team) => {
        arrPlayersSorted.push(...team.players);
      });
      const playersSorted = arrPlayersSorted.sort(function (a, b) {
        return b.goals - a.goals;
      });
      let arrGoalieSorted = [];
      result.map((team) => {
        arrGoalieSorted.push(...team.goalies);
      });
      const goaliesSorted = arrGoalieSorted.sort(function (a, b) {
        return b.wins - a.wins;
      });
      res.render("stats", { players: playersSorted, goalies: goaliesSorted });
    })
    .catch((err) => {
      console.log(err);
    });
});

///////////////////////Individual Team Page/////////////////////////////
router.get("/teams/:id", (req, res) => {
  const id = req.params.id;
  Team.findById(id)
    .then((result) => {
      const goalsSorted = result.players.sort(function (a, b) {
        return b.goals - a.goals;
      });
      const winsSorted = result.goalies.sort(function (a, b) {
        return b.wins - a.wins;
      });
      res.render("teamID", { team: result, goalsSorted, winsSorted });
    })
    .catch((err) => {
      console.log(err);
    });
});
///////////////////////Individual Player Page/////////////////////////////
router.get("/players/:first/:last", (req, res) => {
  const first = req.params.first;
  const last = req.params.last;

  Team.find().then((result) => {
    const playersArray = [];

    result.map((team) => {
      playersArray.push(...team.players);
      playersArray.push(...team.goalies);
    });

    const personInfo = playersArray.filter((person) => {
      return person.first == first && person.last == last;
    });

    res.render("player", { first, last, personInfo });
  });
});

///////////////////////404/////////////////////////////
router.use((req, res) => {
  res.status(404).render("404");
});

module.exports = router;
