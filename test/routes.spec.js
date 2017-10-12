const chai = require('chai');
 /* eslint-disable no-alert, no-unused-vars */
const should = chai.should();
 /* eslint-enable no-alert, no-unused-vars */
const chaiHttp = require('chai-http');
const server = require('../server');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('Client Routes', () => {

  it('should return the home page with text', (done) => {
    chai.request(server)
    .get('/')
    .end((error, response) => {
      response.should.have.status(200);
      response.should.be.html;
      response.res.text.includes('BYOB');
      done();
    });
  });

  it('should return a 404 for a route that does not exist', (done) => {
    chai.request(server)
    .get('/sad')
    .end((err, response) => {
      response.should.have.status(404);
      done();
    });
  });

});

describe('API Routes', () => {
  
  let token;

  before((done) => {
    database.migrate.latest()
      .then(() => done())
       /* eslint-disable no-alert, no-console */
      .catch(error => console.log(error));
       /* eslint-enable no-alert, no-console */

    chai.request(server)
    .post('/api/v1/authenticate')
    .send({ appName: 'New App', email: 'Johnny@turing.io' })
    .end((error, response) => token = JSON.parse(response.text).token);
  });

  beforeEach((done) => {
    database.seed.run()
      .then(() => done())
       /* eslint-disable no-alert, no-console */
      .catch(error => console.log(error));
       /* eslint-enable no-alert, no-console */
  });

  describe('GET /api/v1/types', () => {

    it('should retrieve all types', (done) => {
      chai.request(server)
      .get('/api/v1/types')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(3);
        response.body[0].should.have.property('id');
        response.body[0].id.should.equal(1);
        response.body[0].should.have.property('type');
        response.body[0].type.should.equal('activity');
        response.body[1].should.have.property('id');
        response.body[1].id.should.equal(2);
        response.body[1].should.have.property('type');
        response.body[1].type.should.equal('drinking');
        response.body[2].should.have.property('id');
        response.body[2].id.should.equal(3);
        response.body[2].should.have.property('type');
        response.body[2].type.should.equal('food');
        done();
      });
    });

    it('should return a 404 if the path is incorrect', (done) => {
      chai.request(server)
      .get('/api/v1/turing')
      .end((error, response) => {
        response.should.have.status(404);
        done();
      });
    });

  });

  describe('GET /api/v1/holidays', () => {

    it('should retrieve all holidays', (done) => {
      chai.request(server)
      .get('/api/v1/holidays')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(5);
        response.body[0].should.have.property('id');
        response.body[0].id.should.equal(1);
        response.body[0].should.have.property('name');
        response.body[0].name.should.equal('National Relaxation Day');
        response.body[0].should.have.property('fullDate');
        response.body[0].fullDate.should.equal('August 15');
        response.body[0].should.have.property('month');
        response.body[0].month.should.equal('August');
        response.body[0].should.have.property('type_id');
        response.body[0].type_id.should.equal(1);
        response.body[1].should.have.property('id');
        response.body[1].id.should.equal(2);
        response.body[1].should.have.property('name');
        response.body[1].name.should.equal('National Red Wine Day');
        response.body[1].should.have.property('fullDate');
        response.body[1].fullDate.should.equal('August 28');
        response.body[1].should.have.property('month');
        response.body[1].month.should.equal('August');
        response.body[1].should.have.property('type_id');
        response.body[1].type_id.should.equal(2);
        response.body[2].should.have.property('id');
        response.body[2].id.should.equal(3);
        response.body[2].should.have.property('name');
        response.body[2].name.should.equal('National Taco Day');
        response.body[2].should.have.property('fullDate');
        response.body[2].fullDate.should.equal('October 4');
        response.body[2].should.have.property('month');
        response.body[2].month.should.equal('October');
        response.body[2].should.have.property('type_id');
        response.body[2].type_id.should.equal(3);
        done();
      });
    });

    it('should return a 404 if the path is incorrect', (done) => {
      chai.request(server)
      .get('/api/v1/denver')
      .end((error, response) => {
        response.should.have.status(404);
        done();
      });
    });

    it('should filter the holidays by query param', (done) => {
      chai.request(server)
      .get('/api/v1/holidays?month=August')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(2);
        response.body[0].should.have.property('id');
        response.body[0].id.should.equal(1);
        response.body[0].should.have.property('name');
        response.body[0].name.should.equal('National Relaxation Day');
        response.body[0].should.have.property('fullDate');
        response.body[0].fullDate.should.equal('August 15');
        response.body[0].should.have.property('month');
        response.body[0].month.should.equal('August');
        response.body[0].should.have.property('type_id');
        response.body[0].type_id.should.equal(1);
        response.body[1].should.have.property('id');
        response.body[1].id.should.equal(2);
        response.body[1].should.have.property('name');
        response.body[1].name.should.equal('National Red Wine Day');
        response.body[1].should.have.property('fullDate');
        response.body[1].fullDate.should.equal('August 28');
        response.body[1].should.have.property('month');
        response.body[1].month.should.equal('August');
        response.body[1].should.have.property('type_id');
        response.body[1].type_id.should.equal(2);
        done();
      });
    });

  });

  describe('GET /api/v1/holidays/:id', () => {

    it('should retrieve a specific holiday', (done) => {
      chai.request(server)
      .get('/api/v1/holidays/2')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(1);
        response.body[0].should.have.property('id');
        response.body[0].id.should.equal(2);
        response.body[0].should.have.property('name');
        response.body[0].name.should.equal('National Red Wine Day');
        response.body[0].should.have.property('fullDate');
        response.body[0].fullDate.should.equal('August 28');
        response.body[0].should.have.property('month');
        response.body[0].month.should.equal('August');
        response.body[0].should.have.property('type_id');
        response.body[0].type_id.should.equal(2);
        done();
      });
    });

    it('should return a 404 if the path is incorrect', (done) => {
      chai.request(server)
      .get('/api/v1/i10')
      .end((error, response) => {
        response.should.have.status(404);
        done();
      });
    });

  });

  describe('GET /api/v1/types/:id/holidays', () => {

    it('should get all the holidays of a specific type', (done) => {
      chai.request(server)
      .get('/api/v1/types/1/holidays')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(2);
        response.body[0].should.have.property('id');
        response.body[0].id.should.equal(1);
        response.body[0].should.have.property('name');
        response.body[0].name.should.equal('National Relaxation Day');
        response.body[0].should.have.property('fullDate');
        response.body[0].fullDate.should.equal('August 15');
        response.body[0].should.have.property('month');
        response.body[0].month.should.equal('August');
        response.body[0].should.have.property('type_id');
        response.body[0].type_id.should.equal(1);
        response.body[1].should.have.property('id');
        response.body[1].id.should.equal(5);
        response.body[1].should.have.property('name');
        response.body[1].name.should.equal('Halloween');
        response.body[1].should.have.property('fullDate');
        response.body[1].fullDate.should.equal('October 31');
        response.body[1].should.have.property('month');
        response.body[1].month.should.equal('October');
        response.body[1].should.have.property('type_id');
        response.body[1].type_id.should.equal(1);
        done();
      });
    });
  });


  describe('POST /api/v1/types', () => {

    it('should be able to add a new holiday type that does not already exist', (done) => {
      chai.request(server)
      .post('/api/v1/types')
      .set('Authorization', token)
      .send({
        id: 4,
        type: 'sports'
      })
      .end((error, response) => {
        response.should.have.status(201);
        response.body.should.be.a('array');
        response.body.length.should.equal(1);
        response.body[0].should.have.property('type');
        response.body[0].type.should.equal('sports');
        chai.request(server)
        .get('/api/v1/types')
        .end((error, response) => {
          response.body.should.be.a('array');
          response.body.length.should.equal(4);
          done();
        });
      });
    });

    it('should not create a type that already exists', (done) => {
      chai.request(server)
      .post('/api/v1/types')
      .set('Authorization', token)
      .send({
        id: 4,
        type: 'food'
      })
      .end((error, response) => {
        response.should.have.status(500);
        chai.request(server)
        .get('/api/v1/types')
        .end((error, response) => {
          response.body.should.be.a('array');
          response.body.length.should.equal(3);
          done();
        });
      });
    });

    it('should not create a type with missing params', (done) => {
      chai.request(server)
      .post('/api/v1/types')
      .set('Authorization', token)
      .send({
        id: 4
      })
      .end((error, response) => {
        response.should.have.status(422);
        done();
      });
    });
  });



  describe('DELETE /api/v1/holidays/:id', () => {

    it('should delete a holiday with matching ID', (done) => {
      chai.request(server)
      .delete('/api/v1/holidays/1')
      .set('Authorization', token)
      .end( (error, response) => {
        response.should.have.status(204);
        response.body.should.be.a('object');

        chai.request(server)
        .get('/api/v1/holidays')
        .end( (error, response) => {
          response.should.have.status(200);
          response.body.should.be.a('array');
          response.body.length.should.equal(4);
          response.res.text.should.not.include('National Relaxation Day');
          done();
        });
      });
    });
  });

  describe('DELETE /api/v1/types/:id', () => {

    it('should delete a holiday type with matching ID', (done) => {
      chai.request(server)
      .delete('/api/v1/types/1')
      .set('Authorization', token)
      .end( (error, response) => {
        response.should.have.status(204);
        response.body.should.be.a('object');

        chai.request(server)
        .get('/api/v1/types')
        .end( (error, response) => {
          response.should.have.status(200);
          response.body.should.be.a('array');
          response.body.length.should.equal(2);
          response.res.text.should.not.include('activity');
          done();
        });
      });
    });
  });
});
