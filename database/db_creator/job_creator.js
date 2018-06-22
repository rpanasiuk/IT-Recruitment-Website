const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

const Position = require('./models/position.js');
const Title = require('./models/title.js');
const Job = require('./models/job.js');
const Currency = require('./models/currency.js');
const Location = require('./models/location.js');
const Technology = require('./models/technology.js');
const Language = require('./models/language.js');

const currencies = require( './currencies.json' );
const languages = require( './languages.json' );
const locations = require( './locations.json' );
const positions = require( './positions.json' );
const technologies = require( './technologies.json' );
const titles = require( './titles.json' );

const url = 'mongodb://localhost/hrjobs';

mongoose.connect(url);
mongoose.connection
	.once('open', (err, db) => {
		if(err) { return console.dir(err); }
		console.log('Connected..');

	})
	.on('error', err => {
		console.warn('Warning', err);
	});

function randomize(array) {
	return array[Math.floor(Math.random() * array.length)];
}

function randomInt(min,max)	{
    return 100 * Math.ceil(Math.floor(Math.random()*(max-min+1)+min) / 100);
}

function randomizeItems(array) {
	let arr = [];

	if (array.length < 4) {
		console.log('Array is too short.');
		return;
	}

	while (arr.length < 7) {
		const newInt = Math.floor(Math.random() * array.length);

		if (!arr.includes(newInt)) {
			arr.push(newInt);
		}
	}

	return arr
}

const desc = ['This is a varied, challenging Developer role taking ownership of projects developing robust web & mobile solutions for a diverse range of clients.', 'As an engineer , you will be working in a close knit team at the forefront of shaping our clients experience by creating new technology driven businesses to externalize our core analytics and data to both existing clients and entirely new markets.', 'Candidates will have broad Information Security skills with a solid understanding of Access Management, Infrastructure Security, Application Security, Data Protection and experience working with a broader team on security products and services.'];

for (var x = 0; x < positions.length; x++) {

	for (var y = 0; y < positions[x].titles.length; y++) {

		const job = new Job({});

		const position = mongoose.Types.ObjectId(positions[x]._id.$oid);

		const title = mongoose.Types.ObjectId(positions[x].titles[y].$oid);

		const curr = mongoose.Types.ObjectId(randomize(currencies)._id.$oid);

		const loc = mongoose.Types.ObjectId(randomize(locations)._id.$oid);
		
		const lang = mongoose.Types.ObjectId(randomize(languages)._id.$oid);


		const technologiesIndexesArray = randomizeItems(technologies);

		for (var i = 0; i < technologiesIndexesArray.length; i++) {
			const tech = mongoose.Types.ObjectId(technologies[technologiesIndexesArray[i]]._id.$oid);

			if (i < 4) {
				job.skills.mustHave.push(tech);
			} else {
				job.skills.niceToHave.push(tech);
			}
		}

		const perks = [];
		
		for (var i = 0; i < 12; i++) {
			perks.push((Math.random() >= 0.5));
		}

		job.perks = perks;
		job.description = randomize(desc);
		job.salaryRange.from = randomInt(5000,15000);
		job.salaryRange.to = job.salaryRange.from + 3000;
		job.type = randomize(['pernament', 'temporary', 'contract']);

		job.salaryRange.currency = curr;		
		job.location = loc;
		job.skills.languages.push(lang);
		job.position = position;
		job.title = title;

		job.save()
			.catch((err) => console.warn('Warning: ', err.message));
	}
} 