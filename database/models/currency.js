const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CurrencySchema = new Schema({
	name: {
		type: String,
		unique: true,
		required: [true, 'Specyfing currency code name is required.'],
		match: [/[a-zA-Z]+/, 'Currency code name accepts only letters.'],		
		validate: {
			validator: (code) => {code.length === 3},
			message: 'The code should contain exactly 3 characters.'
		},
		uppercase: true
	}
});

// CurrencySchema.pre('save', function(next) {
// 	console.log(this.name);
	
// 	next();
// });

const Currency = mongoose.model('currency', CurrencySchema);

module.exports = Currency;