// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models/');

var trumpet_Players = [
	{
	name: 'Clark Terry',
    city: 'St. Louis, MO.',
    song: 'Mumbles',
    alive: 'no'
	},
	{
	name: 'Miles Davis',
	city: 'Alton, IL.',
	song: 'Four',
	alive: 'no'
	},
	{
	name: 'Freddie Hubbard',
	city: 'Indianapolis, IN.',
	song: 'Povo',
	alive: 'no'			
	},
	{
	name: 'Lee Morgan',
	city: 'Philadelphia, PA.',
	song: 'The Sidewinder',
	alive: 'no'	
	}
];
  










// {description: 'Great Trumpet Players'};

db.Trumpets.create(trumpet_Players, function(err, player) {

	if (err){
		return console.log('Error:', err);
	}
	console.log(player);
	console.log('Created new Player', player._id);
	process.exit();
});


// var new_campsite = {description: "Sharp rocks. Middle of nowhere."};

// db.Campsite.create(new_campsite, function(err, campsite){
//   if (err){
//     return console.log("Error:", err);
//   }

//   console.log("Created new campsite", campsite._id);
//   process.exit(); // we're all done! Exit the program.
// });
