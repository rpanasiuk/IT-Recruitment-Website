const mongoose = require('mongoose');
const express = require('express');

const bodyParser = require('body-parser');
const path = require('path');

mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== 'test') {
	mongoose.connect('mongodb://localhost/hrjobs');
};

require('./database/models/technology.js');
require('./database/models/currency.js');
require('./database/models/location.js');
require('./database/models/title.js');

const routes = require('./database/routes/routes.js');

const app = express();

app.set('views', path.join(__dirname, '/database/views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use('/api', routes);

app.use((err, req, res, next) => {
	res.status(422).send({ error: err.message });
});

module.exports = app;