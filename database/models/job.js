const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JobSchema = new Schema({

	title: {
		type: Schema.Types.ObjectId,
		ref: 'title'
	},

	company: {
		type: Schema.Types.ObjectId,
		ref: 'company'		
	},

	description: {
		type: String,
		// validate: {
		// 	validator: (text) => {
		// 		if (text.length >= 50 && text.length =< 500) {
		// 			return true;
		// 		};
		// 		return false;
		// 	},
		// 	message: 'Description needs to have 50-500 letters.'
		// },		
		required: true
	},

	salaryRange: {
		from: {
			type: Number,
			default: 0,
			validate: {
				validator: Number.isInteger,
				message: 'Lower salary limit needs to be an integer. If you do not want to set it up, leave it on default value - 0.'
			},
			required: true
		},

		to: {
			type: Number,
			validate: {
				validator: Number.isInteger,
				message: 'Upper salary limit needs to be an integer.'
			},
			required: [true, 'Upper salary limit is required.']
		},

		currency: {
			type: Schema.Types.ObjectId,
			ref: 'currency'
		},
	},

	type: {
		type: String,
		validate: {
			validator: (jobType) => {
				const job = jobType.toLowerCase();
				return ['pernament', 'temporary', 'contract'].includes(job);
			},
			message: 'Aviable types of employment: Pernament, Temporary or Contract.'
		},
		required: [true, 'Type of employment is required.']
	},

	posted: {
		type: Date,
		default: Date.now
	},

	location: {
		type: Schema.Types.ObjectId,
		ref: 'location'
	},

	skills: {
		mustHave: [{
			type: Schema.Types.ObjectId,
			ref: 'technology'
		}],

		niceToHave: [{
			type: Schema.Types.ObjectId,
			ref: 'technology'
		}],

		languages: [{
			type: Schema.Types.ObjectId,
			ref: 'language'
		}]
	},

	perks: {
		type: Array,
		'default': [
			false, false, false, false, false, false,
			false, false, false, false, false, false
		]
	}
});

		// ----  Perks	Legend	-----
		// inHouseTrainings: 	Boolean,
		// teamEvents: 			Boolean,
		// kitchen: 			Boolean,
		// shower: 				Boolean,
		// healthCare: 			Boolean,
		// freeCoffee: 			Boolean,
		// freeParking: 		Boolean,
		// bikeParking: 		Boolean,
		// gym: 				Boolean,
		// playRoom: 			Boolean,

// JobSchema.path('perks').validate((arr) => {
// 	const itemsArr = [0, 1, true, false];

// 	if (!arr) {return false;};
// 	for (let bools in arr) {
// 		console.log(bools);
// 		if (!itemsArr.includes(bools)) {
// 			return false;
// 		}
// 	}
// 	return true;
// }, 'Array accepts only 0/1 and true/false values.');

const Job = mongoose.model('job', JobSchema);

module.exports = Job;
