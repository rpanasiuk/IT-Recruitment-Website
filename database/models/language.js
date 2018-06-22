const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LanguageSchema = new Schema({
	name: String,
	level: {
		type: Number,
		min: 1,
		max: 3
	}
});

// LanguageSchema.pre('save', function(next) {
// 	console.log(this.name);
	
// 	next();
// });

const Language = mongoose.model('language', LanguageSchema);

module.exports = Language;