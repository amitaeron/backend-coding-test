'use strict';

const { validationError } = require('../errorHandler/errorHandler');

const ridesPostPayload = (body) => {
  const startLatitude = Number(body.start_lat);
  const startLongitude = Number(body.start_long);
  const endLatitude = Number(body.end_lat);
  const endLongitude = Number(body.end_long);
  const riderName = body.rider_name;
  const driverName = body.driver_name;
  const driverVehicle = body.driver_vehicle;

  if (startLatitude < -90 || startLatitude > 90 || startLongitude < -180 || startLongitude > 180) {
    return validationError('Start latitude and longitude must be between 90 - 90 and -180 to 180 degrees respectively');
  }

  if (endLatitude < -90 || endLatitude > 90 || endLongitude < -180 || endLongitude > 180) {
    return validationError('End latitude and longitude must be between 90 - 90 and -180 to 180 degrees respectively');
  }

  if (typeof riderName !== 'string' || riderName.length < 1) {
    return validationError('Rider name must be a non empty string');
  }

  if (typeof driverName !== 'string' || driverName.length < 1) {
    return validationError('Driver name must be a non empty string');
  }

  if (typeof driverVehicle !== 'string' || driverVehicle.length < 1) {
    return validationError('Driver vehicle must be a non empty string');
  }

};

module.exports = {
  ridesPostPayload
};
