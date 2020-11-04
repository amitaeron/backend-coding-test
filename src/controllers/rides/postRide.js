'use strict';

const { ridesPostPayload } = require('../../validator/ridesPostPayload');
const getRidesFromDbById = require('./getRide').getRidesFromDbById;
const errorHandler = require('../../errorHandler/errorHandler');

const postRide = async (req, res, db) => {
  const validationChecker = ridesPostPayload(req.body);

  if (validationChecker) {
    return res.status(400).send(validationChecker);
  }
  try {
    const savedRideID = await saveToDb(db, req.body);
    const ride = await getRidesFromDbById(db, savedRideID);

    return res.status(201).send(ride[0]);
  } catch (err) {
    return res.status(500).send(err);
  }

};

const saveToDb = async (db, body) => {
  return new Promise((res, rej) => {
    const values = [body.start_lat, body.start_long, body.end_lat, body.end_long, body.rider_name, body.driver_name, body.driver_vehicle];

    db.run('INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)', values, function (err) {
      if (err) {
        logger.error('Unknown error');
        rej(errorHandler.serverError(err));
      }
      res(this.lastID);
    });
  });
};

module.exports = postRide;
