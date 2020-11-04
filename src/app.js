'use strict';

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const { postRide, getAllRides, getRideById } = require('./controllers/rides/index');

module.exports = (db) => {
  app.get('/health', (req, res) => res.send('Healthy'));

  app.post('/rides', jsonParser, (req, res) => {
    postRide(req, res, db);
  });

  app.get('/rides', (req, res) => {
    getAllRides(req, res, db);
  });

  app.get('/rides/:id', (req, res) => {
    getRideById(req, res, db);
  });

  return app;
};
