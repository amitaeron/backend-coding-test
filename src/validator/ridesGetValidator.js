'use strict';

const { validationError } = require('../errorHandler/errorHandler');

const checkPaginationQueryParams = (pageNo, records) => {
  if (isNaN(pageNo) && isNaN(records)){
    return validationError('Missing PageNumber or RecordPerPage parameter.');
  }
  if (!isNaN(pageNo) !== !isNaN(records)){
    return validationError('Wrong PageNumber or RecordPerPage.');
  } else if (pageNo < 1 || records < 1){
    return validationError('Wrong PageNumber or RecordPerPage.');
  }

};

module.exports = checkPaginationQueryParams;
