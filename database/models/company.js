const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
	company: String,
	url: String,
	remoteFriendly: Boolean,
	markets: [{
		type: Schema.Types.ObjectId,
		ref: 'market'
	}],
	size: Number,
	jobs: [{
		type: Schema.Types.ObjectId,
		ref: 'job'
	}]
});


CompanySchema.virtual('jobCount').get(function() {
	return this.jobs.length;
});

const Company = mongoose.model('company', CompanySchema);

module.exports = Company;