const Joi = require('joi');

module.exports = {
  // POST /api/auth/google
  googleLogin: {
    body: {
      idToken: Joi.string().required()
    }
  },

  // POST /api/user/profile
  profile: {
    headers: {
      authorization: Joi.string().required()
    }
  }
};
