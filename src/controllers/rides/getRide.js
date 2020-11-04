'use strict';

const checkPaginationQueryParams = require('../../validator/ridesGetValidator');
const { notFoundError, serverError } = require('../../errorHandler/errorHandler');
const logger = require('../../../lib/winston');

const getAllRides = async (req, res, db) => {

  const pageNumber = Number(req.query.pageNumber);
  const recordPerPage = Number(req.query.recordPerPage);

  try {
    const pageValidator = checkPaginationQueryParams(pageNumber, recordPerPage);

    if (pageValidator) {
      return res.status(400).send(pageValidator);
    }
    const rides = await getAllRidesFromDb(db, pageNumber, recordPerPage);

    if (rides.length === 0) {
      return res.status(404).send(notFoundError());
    }
    res.status(200).send({ recordCount: rides.length, rides: rides });
  } catch (err) {
    res.status(500).send(err);
  }

};

const getRideById = async (req, res, db) => {

  try {
    const rides = await getRidesFromDbById(db, req.params.id);

    if (rides.length === 0) {
      return res.status(404).send(notFoundError());
    }
    return res.status(200).send(rides[0]);
  } catch (err) {
    return res.status(500).send(err);
  }

};

const getAllRidesFromDb = async (db, pageNumber, recordPerPage) => {
  return new Promise((res, rej) => {

    db.all('SELECT * FROM Rides limit ? offset ?', [recordPerPage, ((pageNumber - 1)*recordPerPage)], function (err, rows) {
      if (err) {
        rej(serverError(err));
      }
      logger.info(rows);
      res(rows);
    });

  });
};

const getRidesFromDbById = async (db, id) => {
  return new Promise((res, rej) => {

    db.all('SELECT * FROM Rides WHERE rideID= ?', [id], function (err, rows) {
      if (err) {
        rej(serverError(err));
      }
      logger.info(rows);
      res(rows);
    });

  });
};

module.exports = {
  getAllRides,
  getRideById,
  getRidesFromDbById
};
