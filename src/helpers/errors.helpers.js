/* eslint-disable max-classes-per-file */
class IdError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NoIdRegistered';
  }
}

class DatabaseError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DatabaseError';
  }
}

module.exports = {
  IdError,
  DatabaseError,
};
