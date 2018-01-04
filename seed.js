// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var new_trumpetPlayer = {description: 'Great Trumpet Players'};

db.Trumpets.create(new_trumpetPlayer, function(err, player) {
	if (err){
		return console.log('Error:', err);
	}

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
