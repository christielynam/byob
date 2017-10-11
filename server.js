const express = require('express');
const app = express();
const path = require('path');

const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000);
app.locals.title = 'BYOB';

app.get('/', (request, response) => {
  response.send('Welcome to BYOB!')
});


app.get('/api/v1/types', (request, response) => {
  database('types').select()
    .then(types => {
      response.status(200).json(types)
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.get('/api/v1/holidays', (request, response) => {
  database('holidays').select()
    .then(holidays => {
      response.status(200).json(holidays)
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})







app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;
