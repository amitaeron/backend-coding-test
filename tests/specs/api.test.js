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

    it('should return rides ', (done) => {
      request(app)
        .get('/rides')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          expect(res.body[0].riderName).to.equals('abc');
          done();
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
          .get('/rides')
          .expect('Content-Type', /json/)
          .expect(404, done);
      });

    });
  });
});
