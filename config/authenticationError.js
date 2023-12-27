class AuthenticationError extends Error {
    constructor(message,fieldError, code) {
      super(message);
      this.name = 'AuthenticationError';
      this.fieldError = fieldError || '';
      this.code = code;
    }
  }
  
  module.exports = AuthenticationError;