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

app.get('/api/v1/holidays/:month', (request, response) => {
  const { month } = request.params;

  database('holidays').where({ month }).select()
  .then(holidays => {
    response.status(200).json(holidays)
  })
  .catch(error => {
    response.status(500).json({ error })
  })
})

app.get('/api/v1/types/:id/holidays', (request, response) => {
  const { id } = request.params;

  database('holidays').where({ type_id: id }).select()
  .then(holidays => {
    response.status(200).json(holidays)
  })
  .catch(error => {
    response.status(500).json({ error })
  })
})

// app.get(`/api/v1/holidays?/${month}`, (request, response) => {
//   const { month } = request.params;
//
//   database('holidays').where({ month }).select()
//   .then(holidays => {
//     response.status(200).json(holidays)
//   })
//   .catch(error => {
//     response.status(500).json({ error })
//   })
// })

app.post('/api/v1/types', (request, response) => {
  const type = request.body;

  for (let requiredParameter of ['type']) {
    if(!type[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { type: <String> }. You're missing a "${requiredParameter}" property.` })
    }
  }

database('types').select().where('type', type.type)
  .then(type => {
    if (type.length) {
      return response.status(400).json({error: 'type already exists'})
    }
  })
  database('types').insert(type, '*')
  .then(results => {
    response.status(201).json(results)
  })
  .catch(error => {
    response.status(500).json({ error })
  })
})

app.post('/api/v1/holidays', (request, response) => {
  const holiday = request.body;

  for (let requiredParameter of ['name', 'fullDate', 'month', 'type_id']) {
    if(!holiday[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { name: <String>, fullDate: <String>, month: <String>, type_id: <Integer> }. You're missing a "${requiredParameter}" property.` })
    }
  }

  database('holidays').insert(holiday, '*')
    .then(results => {
      response.status(201).json(results)
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})



app.delete('/api/v1/holidays/:id', (request, response) => {
  const { id } = request.params;

  database('holidays').where({ id }).del()
  .then(holiday => {
    if (holiday) {
      response.sendStatus(204)
    } else {
      response.status(422).json({ error: 'Not Found' })
    }
  })
  .catch(error => {
    response.status(500).json({ error })
  })
})

app.delete('/api/v1/types/:id', (request, response) => {
  const { id } = request.params;

  database('types').where({ id }).del()
  .then(type => {
    if (type) {
      response.sendStatus(204)
    } else {
      response.status(422).json({ error: 'Not Found' })
    }
  })
  .catch(error => {
    response.status(500).json({ error })
  })
})


app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;
