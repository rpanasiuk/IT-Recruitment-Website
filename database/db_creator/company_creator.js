const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const Market = require('../models/market.js');
const Company = require('../models/company.js');

const markets = require( './markets.json' );

const url = 'mongodb://localhost/hrjobs';

function randomize(array) {
	return array[Math.floor(Math.random() * array.length)];
}

mongoose.connect(url);
mongoose.connection
	.once('open', (err, db) => {
		if(err) { return console.dir(err); }
		console.log('Connected..');

		main(() => {
			// mongoose.connection.close();
		})

	})
	.on('error', err => {
		console.warn('Error', err.message);
	});


function main(callback) {

	const companyArray = ['Cloud Clock Ltd.', 'Docleak', 'Matrix', 'Real Estate Company'];
	const logoArray = ['cloud_clock.png', 'docleak.png', 'matrix.png', 'realestate.png'];
	const urlArray = ['cloudclock.com', 'docleak.com', 'matrixsecurity.com', 'realestate.com'];
	const remoteFriendlyArray = [true, true, false, false];
	const sizeArray = [100, 200, 300, 400];

	for (let x = 0; x < companyArray.length; x++) {
		const company = new Company({});

		company.name = companyArray[x];
		company.logo = logoArray[x];
		company.url = urlArray[x];
		company.remoteFriendly = remoteFriendlyArray[x];
		company.size = sizeArray[x];

		const market = randomize(markets);
		company.markets = mongoose.Types.ObjectId(market._id.$oid);

		company.save()
			.catch((err) => console.warn('Warning: ', err.message));
	}

	callback();
}
