const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PositionSchema = new Schema({
	name: {
		type: String,
		unique: true,
		required: [true, 'Position name is required.'],
		validate: {
			validator: (positionName) => positionName.length > 1,
			message: 'Name must be longer than 1 character.'
		}
	},

	titles: [{
		type: Schema.Types.ObjectId,
		ref: 'title'
	}],
});

// PositionSchema.pre('save', function(next) {
// 	console.log(this.name);
	
// 	next();
// });


const Position = mongoose.model('position', PositionSchema);

module.exports = Position;