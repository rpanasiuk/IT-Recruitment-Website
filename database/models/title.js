const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TitleSchema = new Schema({
	name: {
		type: String,
		unique: true,
		required: [true, 'Position title is required.']
	}
});

// TitleSchema.pre('save', function(next) {
// 	console.log(this.name);
	
// 	next();
// }); 

const Title = mongoose.model('title', TitleSchema);

module.exports = Title;