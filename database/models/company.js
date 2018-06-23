const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
	name: String,
	url: String,
	logo: String,
	remoteFriendly: Boolean,
	markets: [{
		type: Schema.Types.ObjectId,
		ref: 'market'
	}],
	size: Number
});

const Company = mongoose.model('company', CompanySchema);

module.exports = Company;