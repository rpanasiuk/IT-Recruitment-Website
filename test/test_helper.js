const mongoose = require('mongoose');


before((done) => {
	console.log('Starting test environment..');
	mongoose.connect('mongodb://localhost/hrjobs_test');
	mongoose.connection
		.once('open', () => {
			done();
		})
		.on('error', err => {
			console.warn('Warning', err);
		});
});

beforeEach((done) => {
	const { positions, titles, currencies, technologies, languages, locations, jobs } = mongoose.connection.collections;
	positions.drop(() => {
		titles.drop(() => {
			currencies.drop(() => {
				technologies.drop(() => {
					languages.drop(() => {
						locations.drop(() => {
							jobs.drop(() => {
								done();
							});
						});
					});	
				});	
			});		
		});
	});
});