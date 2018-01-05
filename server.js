// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  // TODO: Document all your api endpoints below
  res.json({
    woops_i_has_forgot_to_document_all_my_endpoints: false, // CHANGED ;)
    message: "Welcome to my personal api! Here's what you need to know!",
    documentation_url: "https://github.com/trumpetcoder/express_self_api/README.md", // CHANGED
    base_url: "https://sheltered-plains-59181.herokuapp.com/", // CHANGED
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "A little bit of info about me"}, // CHANGED
      {method: "GET", path: "/api/trumpet", description: "Return a collection of all trumpet players in db"}, // CHANGED
      {method: "GET", path: "/api/trumpet/:id", description: "Grab one trumpet player by an id"}, // ADDED
      {method: "DELETE", path: "/api/trumpet/:id", description: "Delete one player by id tested in postman"}, // CHANGED
      {method: "POST", path: "/api/trumpet", description: "Adding a new player to db, tested in postman"},
      {method: "PUT", path: "/api/trumpet/:id", description: "Updating a particular value based of an id"}
    ]
  });
});

app.get('/api/profile', function(req, res) {
  // Profile Setup
  res.json({
    name: 'Kevin James',
    city: 'Denver',
    github_profile_image: 'https://unsplash.com/photos/bL8MDg0p_nI',
    github_link: 'https://github.com/trumpetcoder',
    pets: [
      {
        name: 'Clyde',
        type: 'Cat',
        breed: 'Calico'

      }]
  });
});

// get all players
app.get('/api/trumpet', function (req, res) {
  // send all players as JSON response
  db.Trumpets.find(function (err, trumpet) {
    res.json(trumpet);
  });  
});

// get one player by id
app.get('/api/trumpet/:id', function (req, res) {
  db.Trumpets.findOne({_id: req.params.id}, function (req, trumpet) {
    res.json(trumpet);
  });
});

// create new player
app.post('/api/trumpet', function (req, res) {
  console.log(req.body.name);
  var newPlayer = new db.Trumpets({
    name: req.body.name,
    city: req.body.city,
    song: req.body.song,
    alive: req.body.alive
  });
  console.log(newPlayer);
  // save new player
    db.Trumpets.create(newPlayer, function (err, player) {
      if (err) {
        return console.log('save error: ' + err);      
      }
      console.log('save ', player.name);
      res.json(player);
  });
});

// Update a trumpet player by id
app.put('/api/trumpet/:id', function update(req, res) {
  var trumpetPlayer = req.params.id;
  db.Trumpets.findOneAndUpdate({_id: req.params.id}, {$set: {song: req.body.song}}, function (err, trumpetPlayer) {
    if (err) {
      return console.log(err);
    }
    res.json(trumpetPlayer);
  });
});




// delete a player
app.delete('/api/trumpet/:id', function (req, res) {
  // get trumpet id from url params (`req.params`)
  console.log('trumpet delete', req.params);
  var delTrumpet = req.params.id;
  // find the index of the trumpet we want to remove
  db.Trumpets.findOneAndRemove({ _id: delTrumpet }, function (err, deletedPlayer) {
    res.json(deletedPlayer);
  });
});

// SOME OTHER LOGIC WORKOUT
// if(!req.body.name || !req.body.city || !req.body.song || !req.body.alive) {
//     res.send('name');
//       } else if (res.send('city')) {        
//         } else if (res.send('song')) {
//           }  else if (res.send('alive')){          
//         } else {
//           req.body._id = playerId;
        
//         var thePlayer = trumpet.find(function(player) {
//           return player._id === Number(req.params.id);
//         });

//         thePlayer.name = req.body.name;
//         thePlayer.city = req.body.city;
//         thePlayer.song = req.body.song;
//         thePlayer.alive = req.body.alive;
//         res.json(thePlayer);
//         } 

// hardcoded trumpet player info
// app.get('/api/players', function(req, res) {
//   // Favorite Player setup
//   res.json({
//     name: 'Clark Terry',
//     city: 'St. Louis',
//     songs: [
//     {
//       name: 'Mumbles'
//     }]
//   });
// });

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
