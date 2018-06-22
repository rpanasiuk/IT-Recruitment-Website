const assert = require('assert');
const request = require('supertest');
const app = require('../app.js');

describe('Testing app.js', () => {
	before(() => {
		console.log('Testing the express app..');
	});

	it('Handle a GET request to /api .', (done) => {
		request(app)
			.get('/api')
			.end((err, res) => {
				assert(res.body.test === 'tester');
				done();
			});
	});
})