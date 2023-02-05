/* eslint-disable max-classes-per-file */
class ProductAlreadyExistsError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ProductAlreadyExists';
  }
}

class NoIdRegisteredError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NoIdRegistered';
  }
}

module.exports = {
  ProductAlreadyExistsError,
  NoIdRegisteredError,
};
