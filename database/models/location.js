const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
	name: {
		type: String,
		unique: true,
		required: [true, 'Specifying location name is required.']
	}
});

// LocationSchema.pre('save', function(next) {
// 	console.log(this.name);
	
// 	next();
// });

const Location = mongoose.model('location', LocationSchema);

module.exports = Location;