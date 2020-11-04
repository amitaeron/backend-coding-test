'use strict';

const logger = require('../../lib/winston');

const serverError = (err) => {
  logger.error(err);
  return {
    error_code: 'SERVER_ERROR',
    message: 'Unknown error'
  };
};

const notFoundError = () => {
  logger.error('Could not find any rides');
  return {
    error_code: 'RIDES_NOT_FOUND_ERROR',
    message: 'Could not find any rides'
  };
};

const validationError = (msg) => {
  logger.error(msg);
  return {
    error_code: 'VALIDATION_ERROR',
    message: msg
  };
};

module.exports = {
  serverError,
  notFoundError,
  validationError
};
