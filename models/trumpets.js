var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var TrumpetSchema = new Schema({
  name: String,
  city: String,
  song: String,
  alive: String
});

var Trumpet = mongoose.model('Trumpet', TrumpetSchema);

module.exports = Trumpet;