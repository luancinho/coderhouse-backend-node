const isInteger = require('../helpers/validate.helpers');

const validateId = (req, res, next) => {
  const { id } = req.params;
  if (!isInteger(id)) {
    return res.json({
      error: 'Id value must be an integer positive number to be a valid Id',
    });
  }
  return next();
};

module.exports = validateId;
