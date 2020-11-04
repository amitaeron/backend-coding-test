'use strict';
const assert = require('chai').assert;
const { serverError, notFoundError, validationError } = require('../../src/errorHandler/errorHandler');
const { ridesPostPayload } = require('../../src/validator/ridesPostPayload');
const checkPaginationQueryParams = require('../../src/validator/ridesGetValidator');

describe('Unit Test Cases', () => {
  describe('Handle server error', () => {
    const err = new Error('Error');

    it('should give server error', () => {
      assert.equal(serverError(err).error_code, 'SERVER_ERROR');
    });
  });
  describe('Handle not found error', () => {
    it('should give server error', () => {
      assert.equal(notFoundError().error_code, 'RIDES_NOT_FOUND_ERROR');
    });
  });
  describe('Handle validation error', () => {
    it('should give server error', () => {
      assert.equal(validationError('Error').error_code, 'VALIDATION_ERROR');
    });
  });
  describe('Validate the new ride data', () => {
    it('should give error when start latitude < -90', () => {
      const body = {
        start_lat: -91,
        start_long: -43,
        end_lat: 78,
        end_long: 89,
        rider_name: 'abc',
        driver_name: 'xyz',
        driver_vehicle: 'zz'
      };

      assert.equal(ridesPostPayload(body).error_code, 'VALIDATION_ERROR');
    });
    it('should give error when start latitude > 90', () => {
      const body = {
        start_lat: 91,
        start_long: 43,
        end_lat: 78,
        end_long: 89,
        rider_name: 'abc',
        driver_name: 'xyz',
        driver_vehicle: 'zz',
      };

      assert.equal(ridesPostPayload(body).error_code, 'VALIDATION_ERROR');
    });
    it('should give error when start longitude < -180', () => {
      const body = {
        start_lat: 1,
        start_long: -183,
        end_lat: 78,
        end_long: 89,
        rider_name: 'abc',
        driver_name: 'xyz',
        driver_vehicle: 'zz'
      };

      assert.equal(ridesPostPayload(body).error_code, 'VALIDATION_ERROR');
    });
    it('should give error when start longitude > 180', () => {
      const body = {
        start_lat: 1,
        start_long: 183,
        end_lat: 78,
        end_long: 89,
        rider_name: 'abc',
        driver_name: 'xyz',
        driver_vehicle: 'zz'
      };

      assert.equal(ridesPostPayload(body).error_code, 'VALIDATION_ERROR');
    });
    it('should give error when end latitude < -90', () => {
      const body = {
        start_lat: 1,
        start_long: -43,
        end_lat: -98,
        end_long: 89,
        rider_name: 'abc',
        driver_name: 'xyz',
        driver_vehicle: 'zz'
      };

      assert.equal(ridesPostPayload(body).error_code, 'VALIDATION_ERROR');
    });
    it('should give error when end latitude > 90', () => {
      const body = {
        start_lat: 89,
        start_long: -43,
        end_lat: 98,
        end_long: 89,
        rider_name: 'abc',
        driver_name: 'xyz',
        driver_vehicle: 'zz'
      };

      assert.equal(ridesPostPayload(body).error_code, 'VALIDATION_ERROR');
    });
    it('should give error when end longitude < -180', () => {
      const body = {
        start_lat: 1,
        start_long: -163,
        end_lat: 78,
        end_long: -189,
        rider_name: 'abc',
        driver_name: 'xyz',
        driver_vehicle: 'zz'
      };

      assert.equal(ridesPostPayload(body).error_code, 'VALIDATION_ERROR');
    });
    it('should give error when start end longitude > 180', () => {
      const body = {
        start_lat: 1,
        start_long: 153,
        end_lat: 78,
        end_long: 189,
        rider_name: 'abc',
        driver_name: 'xyz',
        driver_vehicle: 'zz'
      };

      assert.equal(ridesPostPayload(body).error_code, 'VALIDATION_ERROR');
    });
    it('should give error when rider name is blank', () => {
      const body = {
        start_lat: 1,
        start_long: 153,
        end_lat: 78,
        end_long: 179,
        rider_name: '',
        driver_name: 'xyz',
        driver_vehicle: 'zz'
      };

      assert.equal(ridesPostPayload(body).error_code, 'VALIDATION_ERROR');
    });
    it('should give error when driver name is blank', () => {
      const body = {
        start_lat: 1,
        start_long: 153,
        end_lat: 78,
        end_long: 179,
        rider_name: 'abc',
        driver_name: '',
        driver_vehicle: 'zz'
      };

      assert.equal(ridesPostPayload(body).error_code, 'VALIDATION_ERROR');
    });
    it('should give error when driver vehical is blank', () => {
      const body = {
        start_lat: 1,
        start_long: 153,
        end_lat: 78,
        end_long: 179,
        rider_name: 'abc',
        driver_name: 'xyz',
        driver_vehicle: ''
      };

      assert.equal(ridesPostPayload(body).error_code, 'VALIDATION_ERROR');
    });
    it('should not give error when all data is corrrect', () => {
      const body = {
        start_lat: 1,
        start_long: 153,
        end_lat: 78,
        end_long: 179,
        rider_name: 'abc',
        driver_name: 'xyz',
        driver_vehicle: 'zz'
      };

      assert.equal(ridesPostPayload(body), undefined);
    });
  });
  describe('Handle pagination error', () => {
    it('should give error when pageNumber and records are not given', () => {
      assert.equal(checkPaginationQueryParams(NaN, NaN).error_code, 'VALIDATION_ERROR');
    });
    it('should give error when pageNumber or records are not given', () => {
      assert.equal(checkPaginationQueryParams(1, NaN).error_code, 'VALIDATION_ERROR');
    });
    it('should give error when pageNumber is < 1 or record < 1', () => {
      assert.equal(checkPaginationQueryParams(0, 0).error_code, 'VALIDATION_ERROR');
    });
    it('should give not give error when pageNumber and records both are given', () => {
      assert.equal(checkPaginationQueryParams(1, 10), undefined);
    });
  });
});
