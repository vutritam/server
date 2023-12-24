class AuthenticationError extends Error {
    constructor(message, code) {
      super(message);
      this.name = 'AuthenticationError';
      this.code = code;
    }
  }
  
  module.exports = AuthenticationError;