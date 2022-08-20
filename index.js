const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./logic/routes');
const cors = require('./services/cors');

const app = express();

// CORS middleware
app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', routes);

app.set('port', (process.env.PORT || 5000));

const server = app.listen(app.get('port'), function () {
    console.log(`Spider app is running on port ${app.get('port')} :: localhost:${app.get('port')}`);
});

module.exports = app;
