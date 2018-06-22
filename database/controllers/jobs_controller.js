const ejs = require('ejs');

const Position = require('../models/position.js');
const Title = require('../models/title.js');
const Job = require('../models/job.js');
const Currency = require('../models/currency.js');
const Location = require('../models/location.js');
const Technology = require('../models/technology.js');
const Language = require('../models/language.js');

module.exports = {

	expander(req, res, next) {

		const id = req.query._id;
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
				path: 'position',
				model: 'position.name'				
			},
			{
				path: 'title',
				model: 'position.titles'				
			}];

		Job.findOne({ _id: id })
			.populate(populateQuery)
			.then((job) => {

				ejs.renderFile(__dirname + '/../views/expander.ejs', {jobs: job}, function(err, expand) {
					if (err) {return console.log('expander error', err)}


				    res.header("Access-Control-Allow-Origin", "*");
					res.header("Access-Control-Allow-Headers", "X-Requested-With");
				    res.send(expand);					
				})
		})
	},

	page(req, res, next) {
	    const perPage = 9;
	    const page = req.query.page || 1;

	    Job.find({})
	        .sort({ posted: -1 })
	        .skip((perPage * page) - perPage)
	        .limit(perPage)
	        .then((job) => {

				ejs.renderFile(__dirname + '/../views/template.ejs', {jobs: job}, function(err, data) {

				    res.header("Access-Control-Allow-Origin", "*");
					res.header("Access-Control-Allow-Headers", "X-Requested-With");
				    res.send(data);					
				});	            
	        })
	        .catch((err) => next(err));
	},	

	testing(req, res, next) {
		res.send({test: 'tester'});		
	}
};