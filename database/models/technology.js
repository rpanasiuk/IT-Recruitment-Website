const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TechnologySchema = new Schema({
	name: String,
	level: {
		type: Number,
		min: 1,
		max: 3
	}
});




const Technology = mongoose.model('technology', TechnologySchema);

module.exports = Technology;