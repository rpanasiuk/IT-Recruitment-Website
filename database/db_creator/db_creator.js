const Position = require('../models/position.js');
const Title = require('../models/title.js');
const Job = require('../models/job.js');
const Currency = require('../models/currency.js');
const Location = require('../models/location.js');
const Technology = require('../models/technology.js');
const Language = require('../models/language.js');

const mongoose = require('mongoose');
 
module.exports = {

	dbCreator(req, res, next) {

		const positionsArray = ['Frontend', 'Backend', 'Fullstack', 'Testing', 'DevOps', 'UX', 'PM'];
		const frontendArray = ['Junior React Developer', 'Angular Developer', 'Junior Frontend Developer', 'Junior JavaScript Developer', 'Senior JavaScript Developer', 'RoR Developer', 'React Developer', 'Frontend Engineer'];
		const backendArray = ['Junior PHP Developer', 'Junior C++ Developer', 'Junior Python Developer', 'Junior Java Developer', 'Senior PHP Developer', 'Senior C++ Developer', 'Senior Python Developer', 'Senior Java Developer', '.NET Developer', 'Scala Developer', 'Node.js Developer'];
		const fullstackArray = ['Full-stack .NET', 'Full-stack Java', 'Full-stack Angular/JS', 'Full-stack Python/Django', 'Full-stack Engineer', 'Full-stack PHP', 'Full-stack .NET Developer', 'Full-stack Developer'];
		const testingArray = ['Manual Tester', 'QA Engineer'];
		const devopsArray = ['DevOps Engineer'];
		const uxArray = ['UX/UI Designer', 'UX Designer'];
		const pmArray = ['Project Manager', 'Junior Project Manager'];

		const categoriesArray = [frontendArray, backendArray, fullstackArray, testingArray, devopsArray, uxArray, pmArray];

		function randomize(array) {
			return array[Math.floor(Math.random() * array.length)];
		}

		function createPositions() {
			for (var i = 0; i < positionsArray.length; i++) {
				
				const position = new Position({ name: positionsArray[i] });

				for (var j = 0; j < categoriesArray[i].length; j++) {
					const title = new Title({ name: categoriesArray[i][j] });
					title.save()
						.catch((err) => console.warn('Warning: ', err.message));
					position.titles.push(title);
				}

				position.save()
					.catch((err) => console.warn('Warning: ', err.message));
			}
		}

		const desc = ['This is a varied, challenging Developer role taking ownership of projects developing robust web & mobile solutions for a diverse range of clients.', 'As an engineer , you will be working in a close knit team at the forefront of shaping our clients experience by creating new technology driven businesses to externalize our core analytics and data to both existing clients and entirely new markets.', 'Candidates will have broad Information Security skills with a solid understanding of Access Management, Infrastructure Security, Application Security, Data Protection and experience working with a broader team on security products and services.'];
		const currenciesArray = ['PLN', 'EUR', 'USD'];

		function createCurrencies() {
			for (var j = 0; j < currenciesArray.length; j++) {
				const curr = new Currency({ name: currenciesArray[j] });
				curr.save()
					.catch((err) => console.warn('Warning: ', err.message));
			}
		}

		const locationsArray = ['Warszawa', 'Krakow', 'Wroclaw', 'Gdansk', 'Poznan', 'Lodz', 'Gdynia', 'Lublin', 'Katowice', 'Gliwice'];
		
		function createLocations() {
			for (var x = 0; x < locationsArray.length; x++) {
				const loc = new Location({ name: locationsArray[x] });
				loc.save()
					.catch((err) => console.warn('Warning: ', err.message));
			}
		}

		const technologiesArray = ['PHP', 'C++', 'Python', 'Ruby on Rails', 'Java', 'Hibernate', 'Spring', 'Node.js', '.NET', 'Scala', 'React.js', 'Selenium', 'Linux', 'UNIX', 'Bash', 'C#', 'C', 'OOP', 'MySQL', 'PostgreSQL', 'MongoDB', 'Angular', 'Django', 'Big Data', 'Symfony', 'JavaScript', 'JQuery', 'RWD', 'Webpack', 'ES6', 'Photoshop', 'GIMP', 'PRINCE2', 'Agile', 'Scrum', 'GIT'];		
		
		function createTechnologies() {		
			for (var y = 0; y < technologiesArray.length; y++) {
				const tech = new Technology({ name: technologiesArray[y], level: randomize([1, 2, 3]) });
				tech.save()
					.catch((err) => console.warn('Warning: ', err.message));
			}
		}

		const languagesArray = ['English', 'Polish', 'German'];

		function createLanguages() {
			for (var y = 0; y < languagesArray.length; y++) {
				const lang = new Language({ name: languagesArray[y], level: randomize([1, 2, 3]) });
				lang.save()
					.catch((err) => console.warn('Warning: ', err.message));
			}
		}

		function randomInt(min,max)	{
		    return 100 * Math.ceil(Math.floor(Math.random()*(max-min+1)+min) / 100);
		}

		function randomizeItems(arr) {
			var rand = [];
			do {
			  rand[rand.length] = arr.splice(
			                                Math.floor(Math.random() * arr.length)
			                              , 1)[0];
			} while (rand.length < 7);

			return rand;
		}

		function main() {
			createPositions();
			createCurrencies();
			createLocations();
			createTechnologies();
			createLanguages();
		}

		Promise.all([main()])
			.catch((err) => console.warn('Warning: ', err.message));
	},	
}