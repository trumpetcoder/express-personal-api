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
    woops_i_has_forgot_to_document_all_my_endpoints: true, // CHANGE ME ;)
    message: "Welcome to my personal api! Here's what you need to know!",
    documentation_url: "https://github.com/trumpetcoder/express_self_api/README.md", // CHANGED
    base_url: "https://sheltered-plains-59181.herokuapp.com/", // CHANGED
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"}, // CHANGE ME
      {method: "POST", path: "/api/campsites", description: "E.g. Create a new campsite"} // CHANGE ME
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
  var newPlayer = new db.Trumpets({
    name: String,
    city: String,
    song: String,
    alive: String
  });
});
// save new player
  newPlayer.save(function(err, player) {
    if (err) {
      return console.log('save error: ' + err);      
    }
    console.log('save ', player.name);
    res.json(player);
});

  





























// 


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
