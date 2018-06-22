const mongoose = require('mongoose');
const assert = require('assert');

const Position = require('../../database/models/position.js');
const Title = require('../../database/models/title.js');
const Job = require('../../database/models/job.js');
const Currency = require('../../database/models/currency.js');
const Location = require('../../database/models/location.js');
const Technology = require('../../database/models/technology.js');
const Language = require('../../database/models/language.js');

describe('Running test_job.js', () => {

	let jobObj, positionObj, titleObj, currencyObj, locationObj;

	before(() => {
		console.log('Running job tests..');
	});

	beforeEach((done) => {
		jobObj = new Job({});

		positionObj = new Position({ name: 'Frontend Developer' });
		titleObj = new Title({ name: 'Junior React Developer' });


		positionObj.titles.push(titleObj);
		jobObj.position = positionObj;

		jobObj.description = 'temporibus fugit fuga in unde suscipit ipsum odit excepturi culpa, molestiae ratione sequi aut minima.';

		jobObj.salaryRange.from = 10000;
		jobObj.salaryRange.to = 15000;
		currencyObj = new Currency({ name: 'JEN' });
		jobObj.salaryRange.currency = currencyObj;

		jobObj.type = 'Contract';

		locationObj = new Location({ name: 'Paris' });
		jobObj.location = locationObj;

		const technology1 = new Technology({ name: 'C++', level: 3 });
		const technology2 = new Technology({ name: 'C', level: 2 });
		const technology3 = new Technology({ name: 'Python', level: 1 });

		jobObj.skills.mustHave.push(technology1);
		jobObj.skills.mustHave.push(technology2);
		jobObj.skills.mustHave.push(technology3);

		const technology4 = new Technology({ name: 'JavaScript', level: 3 });
		const technology5 = new Technology({ name: 'OOP', level: 2 });
		const technology6 = new Technology({ name: 'Bash', level: 1 });

		jobObj.skills.niceToHave.push(technology4);
		jobObj.skills.niceToHave.push(technology5);
		jobObj.skills.niceToHave.push(technology6);

		const language1 = new Language({ name: 'English', level: 1 });

		jobObj.skills.languages.push(language1);			

		jobObj.perks = [false, true, false, false, false, true, false, false, false, true];

		Promise.all([
			technology1.save(), technology2.save(), technology3.save(), technology4.save(), technology5.save(),
			technology6.save(), language1.save(), titleObj.save(), positionObj.save(), currencyObj.save(),
			locationObj.save(), jobObj.save()
			])
			.then(() => done());
	})

	it('Checking full relation graph of skills in jobs collection.', (done) => {

		Job.findOne({})
			.populate({
				path: 'skills.mustHave',
				model: 'technology'				
			})
			.populate({
				path: 'skills.niceToHave',
				model: 'technology'				
			})
			.populate({
				path: 'skills.languages',
				model: 'language'				
			})
			.then((job) => {

				assert(job.skills.mustHave[0].name === 'C++');
				assert(job.skills.mustHave[1].level === 2);
				assert(job.skills.niceToHave[0].name === 'JavaScript');
				assert(job.skills.niceToHave[1].level === 2);
				assert(job.skills.languages[0].name === 'English');
				assert(job.skills.languages[0].level === 1);
				done();
			})
			.catch((err) => {console.warn('Warning: ', err.message, '\n', err);});
	});

	it('Checking relation graph of location in jobs collection.', (done) => {

		Job.findOne({})
			.populate('location')
			.then((job) => {

				assert(job.location.name === 'Paris');
				done();
			})
			.catch((err) => {console.warn('Warning: ', err.message, '\n', err);});
	});

	it('Checking relation graph of currency in jobs collection.', (done) => {

		Job.findOne({})
			.populate({
				path: 'salaryRange.currency',
				model: 'currency'				
			})
			.then((job) => {

				assert(job.salaryRange.currency.name === 'JEN');
				done();
			})
			.catch((err) => {console.warn('Warning: ', err.message, '\n', err);});
	});

	it('Get an array of job offers searching by a must have technology - C++.', (done) => {

		Technology.findOne({ name: 'C++' })
			.then((tech) => {
				Job.find({ 'skills.mustHave': tech._id })
					.populate({
						path: 'skills.mustHave',
						model: 'technology'				
					})
					.then((job) => {
						console.log(job[0].skills.mustHave);
						done();
					})
					.catch((err) => {console.warn('Warning: ', err.message, '\n', err);})
			})
			.catch((err) => {console.warn('Warning: ', err.message, '\n', err);})

	});
});