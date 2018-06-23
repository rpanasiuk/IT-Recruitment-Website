const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MarketSchema = new Schema({
	name: String
});

const Market = mongoose.model('market', MarketSchema);

module.exports = Market;