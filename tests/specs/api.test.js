'use strict';

const request = require('supertest');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');
const expect = require('chai').expect;

const app = require('../../src/app')(db);
const buildSchemas = require('../../src/schemas');

describe('API tests', () => {
  before((done) => {
    db.serialize((err) => {
      if (err) {
        return done(err);
      }

      buildSchemas(db);

      done();
    });
  });

  describe('GET /health', () => {
    it('should return health', (done) => {
      request(app)
        .get('/health')
        .expect('Content-Type', /text/)
        .expect(200, done);
    });
  });

  describe('POST /rides', () => {
    it('should return validation error if startLatitude < -90', (done) => {
      request(app)
        .post('/rides')
        .send({
          start_lat: -91,
          start_long: -43,
          end_lat: 78,
          end_long: 89,
          rider_name: 'abc',
          driver_name: 'xyz',
          driver_vehicle: 'zz'
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });

    });
    it('should return validation error if startLatitude > 90', (done) => {
      request(app)
        .post('/rides')
        .send({
          start_lat: 91,
          start_long: -43,
          end_lat: 78,
          end_long: 89,
          rider_name: 'abc',
          driver_name: 'xyz',
          driver_vehicle: 'zz'
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });

    });
    it('should return validation error if startLongitude < -180', (done) => {
      request(app)
        .post('/rides')
        .send({
          start_lat: 1,
          start_long: -183,
          end_lat: 78,
          end_long: 89,
          rider_name: 'abc',
          driver_name: 'xyz',
          driver_vehicle: 'zz'
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });

    });
    it('should return validation error if startLongitude > 180', (done) => {
      request(app)
        .post('/rides')
        .send({
          start_lat: 1,
          start_long: 183,
          end_lat: 78,
          end_long: 89,
          rider_name: 'abc',
          driver_name: 'xyz',
          driver_vehicle: 'zz'
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });

    });
  });
  it('should return validation error if endLatitude < -90', (done) => {
    request(app)
      .post('/rides')
      .send({
        start_lat: 1,
        start_long: -43,
        end_lat: -98,
        end_long: 89,
        rider_name: 'abc',
        driver_name: 'xyz',
        driver_vehicle: 'zz'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        done();
      });

  });
  it('should return validation error if endLatitude > 90', (done) => {
    request(app)
      .post('/rides')
      .send({
        start_lat: 89,
        start_long: -43,
        end_lat: 98,
        end_long: 89,
        rider_name: 'abc',
        driver_name: 'xyz',
        driver_vehicle: 'zz'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        done();
      });

  });
  it('should return validation error if endLongitude < -180', (done) => {
    request(app)
      .post('/rides')
      .send({
        start_lat: 1,
        start_long: -163,
        end_lat: 78,
        end_long: -189,
        rider_name: 'abc',
        driver_name: 'xyz',
        driver_vehicle: 'zz'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        done();
      });

  });
  it('should return validation error if endLongitude > 180', (done) => {
    request(app)
      .post('/rides')
      .send({
        start_lat: 1,
        start_long: 153,
        end_lat: 78,
        end_long: 189,
        rider_name: 'abc',
        driver_name: 'xyz',
        driver_vehicle: 'zz'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        done();
      });

  });
  it('should return validation error if riderName is null or not string', (done) => {
    request(app)
      .post('/rides')
      .send({
        start_lat: 1,
        start_long: -43,
        end_lat: 78,
        end_long: 89,
        rider_name: '',
        driver_name: 'xyz',
        driver_vehicle: 'zz'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        done();
      });

  });
  it('should return validation error if driver name is null or not string', (done) => {
    request(app)
      .post('/rides')
      .send({
        start_lat: 1,
        start_long: -43,
        end_lat: 78,
        end_long: 89,
        rider_name: 'abc',
        driver_name: '',
        driver_vehicle: 'zz'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        done();
      });

  });
  it('should return validation error if driverVehicle is null or not string', (done) => {
    request(app)
      .post('/rides')
      .send({
        start_lat: 1,
        start_long: -43,
        end_lat: 78,
        end_long: 89,
        rider_name: 'abc',
        driver_name: 'xyz',
        driver_vehicle: ''
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        done();
      });

  });
  it('should create a ride', (done) => {
    request(app)
      .post('/rides')
      .send({
        start_lat: 1,
        start_long: 143,
        end_lat: 78,
        end_long: 89,
        rider_name: 'abc',
        driver_name: 'xyz',
        driver_vehicle: 'zz'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function(err, res) {
        if (err) {
          return done(err);
        }
        expect(res.body.riderName).to.equals('abc');
        done();
      });

  });

  describe('GET /rides', () => {

    it('should return bad request error when pageNumber and recordPerPage is not given', (done) => {
      request(app)
        .get('/rides')
        .expect('Content-Type', /json/)
        .expect(400)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });

    });

    it('should return rides on given pageNumber', (done) => {
      const values = [];
      let placeHolders = '';

      for (let i = 1; i<=20; ++i) {
        values.push([1, 143, 78, 89, 'abc', 'xyz', 'zz']);
        if (placeHolders !== '') {
          placeHolders += ',';
        }
        placeHolders += '(\'?\', \'?\', \'?\', \'?\', \'?\', \'?\', \'?\')';
      }

      db.run(`INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES ${placeHolders}`, values, function (err) {
        request(app)
          .get('/rides?pageNumber=2&recordPerPage=10')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            if (err) {
              return done(err);
            }
            expect(res.body.recordCount).to.equals(10);
            done();
          });

      });

    });

    it('should return specific rides ', (done) => {
      request(app)
        .get('/rides/1')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          expect(res.body.riderName).to.equals('abc');
          done();
        });

    });

    it('should return not found error on giving wrong ride id', (done) => {
      db.exec('DELETE FROM Rides', (err, res) => {

        request(app)
          .get('/rides/0')
          .expect('Content-Type', /json/)
          .expect(404, done);
      });

    });

    it('should return not found error', (done) => {
      db.exec('DELETE FROM Rides', (err, res) => {

        request(app)
          .get('/rides?pageNumber=1&recordPerPage=10')
          .expect('Content-Type', /json/)
          .expect(404, done);
      });

    });
  });

  describe('Check SQL Injection vulnerability', () => {
    it('should return not found error if we provide sql statement for query parameters', (done) => {
      request(app)
        .get('/rides/DELETE FROM Rides')
        .expect('Content-Type', /json/)
        .expect(404, done);
    });
  });

});
