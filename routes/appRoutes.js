const router = require('express').Router();
let Team = require('../models/team');
var bodyParser = require('body-parser');
const { render } = require('node-sass');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });

///////////////////////Home/////////////////////////////
router.get('/',(req,res)=>{
  Team.find()
    .then(result=>{
        const teams = result.sort(function (a, b) {
        return (b.wins/b.losses) - (a.wins/a.losses);
        });
      res.render('home', {teams});
    })
    .catch(err=>console.log(err));
  })

///////////////////////About/////////////////////////////
router.get('/about', (req,res)=>{
    res.render('about');
});

router.get('/teams', (req,res)=>{
  Team.find()
  .then(result=>{
    res.render('teams', {teams: result});
  })
  .catch(err=>console.log(err))
});

///////////////////////Teams/Create/////////////////////////////
router.post('/teams', parseUrlencoded, (req,res)=>{
  const playerParse = JSON.parse(req.body.Players);
  const goalieParse = JSON.parse(req.body.Goalies);

  const newTeam = new Team({
    teamName: req.body.TeamName,
    players: playerParse,
    goalies: goalieParse,
    wins: 0,
    losses: 0
  });

  newTeam.save()
  .then(()=>{
    res.redirect('/');
  })
  .catch(err=>console.log(err));
})
///////////////////////Stats Page/////////////////////////////
router.get('/stats',(req,res)=>{
  Team.find()
  .then(result=>{
    let arrPlayersSorted = [];
    result.map(team=>{
     arrPlayersSorted.push(...team.players);
    });
    const playersSorted = arrPlayersSorted.sort(function(a,b){
      return b.goals - a.goals
    });
    let arrGoalieSorted = [];
    result.map(team=>{
      arrGoalieSorted.push(...team.goalies);
    });
    const goaliesSorted = arrGoalieSorted.sort(function(a,b){
      return b.wins - a.wins
    })
      res.render('stats',{players: playersSorted, goalies: goaliesSorted})
  })
  .catch(err=>{
    console.log(err);
  })
})

///////////////////////Team Page/////////////////////////////
router.get('/teams/:id', (req,res)=>{
  const id = req.params.id;
  Team.findById(id)
  .then(result=>{
    const goalsSorted = result.players.sort(function(a,b){
      return b.goals - a.goals;
    })
    const winsSorted = result.goalies.sort(function(a,b){
      return b.wins - a.wins;
    })
    res.render('teamID',{team: result, goalsSorted, winsSorted})
  })
  .catch(err=>{
    console.log(err);
  })
})

///////////////////////404/////////////////////////////
router.use((req,res)=>{
    res.status(404).render('404');
})

module.exports = router;
