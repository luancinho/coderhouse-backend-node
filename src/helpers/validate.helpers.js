const isInteger = (value) => {
  if (!Number.isNaN(parseInt(value, 10)) && parseInt(value, 10) >= 0) {
    return true;
  }
  return false;
};

module.exports = isInteger;
