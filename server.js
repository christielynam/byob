const express = require('express');
const app = express();
const path = require('path');

const jwt = require('jsonwebtoken');
const key = 'holiday' //this was living in a key file which has been .gitignored

const key = require('./key')

const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('secretKey', process.env.SECRET_KEY || key)

app.set('port', process.env.PORT || 3000);
app.locals.title = 'BYOB';

app.get('/', (request, response) => {
  response.send('Welcome to BYOB!')
});

const checkAuth = (request, response, next) => {
  const token = request.headers.authorization

  if(!token) {
    return response.status(403).json({ error: 'You must be authorized to hit this endpoint' })
  }

  jwt.verify(token, app.get('secretKey'), (error, decoded) => {
    if(error) {
      return response.status(403).json({ error: 'Invalid token' })
    }
    if(decoded) {
      decoded.admin ? next()
      :
      response.status(403).json({ error: 'You are not authorized to have write access to this endpoint' })
    }
  })
}

app.post('/api/v1/authenticate', (request, response) => {
  const { email, appName } = request.body;
  const emailSuffix = email.split('@')[1];

  if(!email || !appName) {
    return response.status(422).json({ error: 'You are missing an email or application name' })
  }

  let adminCheck = emailSuffix === 'turing.io' ?
  Object.assign({}, { email, appName, admin: true })
  :
  Object.assign({}, { email, appName, admin: false })

  const token = jwt.sign(adminCheck, app.get('secretKey'))
  return response.status(200).json({ token })

})

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
  let { month, fullDate } = request.query;

  const checkParams = () => {
    if (month) {
      return database('holidays').where('month', month).select()
    }
    if (fullDate) {
      return database('holidays').where('fullDate', fullDate.split(' ').join(''))
    } else {
      return database('holidays').select();
    }
  }

  checkParams()
    .then(holidays => {
      response.status(200).json(holidays)
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.get('/api/v1/holidays/:id', (request, response) => {
  const { id } = request.params;

  database('holidays').where({ id }).select()
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

app.post('/api/v1/types', checkAuth, (request, response) => {
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

app.post('/api/v1/holidays', checkAuth, (request, response) => {
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

app.patch('/api/v1/holidays/:id', checkAuth, (request, response) => {
  const holidayPatch = request.body;

  const { id } = request.params;

  database('holidays').where('id', id)
  .update(holidayPatch, '*')
  .then(results => {
    if (!results) {
        response.status(404).json({ error: `Cannot find a holiday with the id of ${id}` })
    }
    response.sendStatus(204)
  })
  .catch(error => {
    response.status(500).json({ error })
  })
})

app.patch('/api/v1/types/:id', checkAuth, (request, response) => {
  const typePatch = request.body;

  const { id } = request.params;

  database('types').where('id', id)
  .update(typePatch, '*')
  .then(results => {
    if (!results) {
        response.status(404).json({ error: `Cannot find a type with the id of ${id}` })
    }
    response.sendStatus(204)
  })
  .catch(error => {
    response.status(500).json({ error })
  })
})

app.delete('/api/v1/holidays/:id', checkAuth, (request, response) => {
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

app.delete('/api/v1/types/:id', checkAuth, (request, response) => {
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
