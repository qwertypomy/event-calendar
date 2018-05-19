const Joi = require('joi');

const headers = {
  authorization: Joi.string().required()
};

module.exports = {
  // POST /api/auth/google
  googleLogin: {
    body: {
      idToken: Joi.string().required()
    }
  },

  // POST /api/user/profile
  profile: {
    headers
  },

  // POST /api/event
  createEvent: {
    headers,
    body: {
      start: Joi.number()
        .min(0)
        .max(539)
        .required(),
      duration: Joi.number()
        .min(1)
        .required(),
      title: Joi.string()
        .trim()
        .min(1)
        .required()
    }
  },
  // DELETE /api/event
  deleteEvent: {
    headers,
    params: {
      id: Joi.string().required()
    }
  }
};
