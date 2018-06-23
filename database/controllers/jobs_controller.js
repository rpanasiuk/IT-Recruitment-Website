const ejs = require('ejs');
const mongoose = require('mongoose');

const Position = require('../models/position.js');
const Title = require('../models/title.js');
const Job = require('../models/job.js');
const Company = require('../models/company.js');
const Currency = require('../models/currency.js');
const Location = require('../models/location.js');
const Technology = require('../models/technology.js');
const Language = require('../models/language.js');

const populateQuery = [
	{
		path:'location', 
		select:'name'
	},
	{
		path: 'skills.mustHave',
		model: 'technology'				
	},
	{
		path: 'skills.niceToHave',
		model: 'technology'				
	},
	{
		path: 'skills.languages',
		model: 'language'				
	},
	{
		path: 'salaryRange.currency',
		model: 'currency'				
	},
	{
		path: 'title'				
	},
	{
		path: 'company'				
	},
	{
	    path: 'company',
	    populate: { path: 'markets' }			
	}
];

module.exports = {


	expander(req, res, next) {

		const id = req.query._id;


		// Company.find({})
		// 	.populate(populateQuery)
		// 	.then((array) => {
			
		// 		const object = {};

		// 		array.forEach((el, i) => {
		// 			el.jobs.forEach((job, i) => {
		// 				if (job._id == id) {
		// 					object['job'] = job;
		// 					object['company'] = el;				
		// 				}
		// 			});
		// 		})

		// 		return object;
		// 	})
		// 	.then((object) => {
		// 		console.log(object);
		// 		ejs.renderFile(__dirname + '/../views/expander.ejs', {jobs: object.job, company: object.company}, function(err, expand) {
		// 			if (err) {return console.log('expander error', err)}


		// 		    res.header("Access-Control-Allow-Origin", "*");
		// 			res.header("Access-Control-Allow-Headers", "X-Requested-With");
		// 		    res.send(expand);					
		// 		})
		// })

		Job.findOne({ _id: id })
			.populate(populateQuery)
			.then((job) => {

				// Company.find({})
				// 	.populate([{
				// 		path: 'jobs',
				// 		model: 'job'
				// 	},
				// 	{
				// 		path: 'markets',
				// 		model: 'market'
				// 	}])
				// 	.then((array) => {
					
				// 		let obj;

				// 		array.forEach((company, i) => {
				// 			company.jobs.forEach((job, i) => {
				// 				if (job._id == id) {
				// 					obj = company;				
				// 				}
				// 			});
				// 		})

				// 		return obj;
				// 	})
				// 	.then((company) => {
						// console.log('obj', company);
						// console.log('job', job);
						ejs.renderFile(__dirname + '/../views/expander.ejs', {jobs: job}, function(err, expand) {
							if (err) {return console.log('expander error', err)}


						    res.header("Access-Control-Allow-Origin", "*");
							res.header("Access-Control-Allow-Headers", "X-Requested-With");
						    res.send(expand);					
						})						
					// })
					// .catch((err) => console.log(err.message))

			})
			.catch((err) => console.log(err.message))
	},

	page(req, res, next) {
	    const perPage = 9;
	    const page = req.query.page || 1;

	    Job.find({})
	        .sort({ posted: -1 })
	        .skip((perPage * page) - perPage)
	        .limit(perPage)
	        .populate(populateQuery)
	        .then((job) => {
	        	console.log(job[0])
				// Company.find({})
				// 	.populate([{
				// 		path: 'jobs',
				// 		model: 'job'
				// 	},
				// 	{
				// 		path: 'markets',
				// 		model: 'market'
				// 	}])
				// 	.then((array) => {
					
				// 		let obj;

				// 		array.forEach((company, i) => {
				// 			company.jobs.forEach((job, i) => {
				// 				if (job._id == id) {
				// 					obj = company;				
				// 				}
				// 			});
				// 		})

				// 		return obj;
				// 	})
				// 	.then((company) => {

						ejs.renderFile(__dirname + '/../views/template.ejs', {jobs: job}, function(err, data) {

						    res.header("Access-Control-Allow-Origin", "*");
							res.header("Access-Control-Allow-Headers", "X-Requested-With");
						    res.send(data);					
						});						
					// })
					// .catch((err) => console.log(err.message))	        	

	            
	        })
	        .catch((err) => next(err));
	},	

	testing(req, res, next) {
		res.send({test: 'tester'});		
	}
};