const jwt = require('jsonwebtoken');
const axios = require('axios');
const httpStatus = require('http-status');
const _ = require('lodash');

const APIError = require('../helpers/APIError');
const config = require('../../config/config');
const User = require('../user/user.model');

const debug = require('debug')('event-calendar:auth.controller'); // eslint-disable-line no-unused-vars

async function googleLogin({ body: { idToken } }, res, next) {
  let profile;
  try {
    const { data } = await axios.get(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${idToken}`
    );
    profile = {
      email: data.email,
      name: data.name,
      picture: data.picture.replace('/s96-c/', '/s40-c-mo/')
    };
  } catch (error) {
    const err = new APIError('Authorization error.', httpStatus.UNAUTHORIZED, true);
    return next(err);
  }

  let user = await User.findOne({ email: profile.email });
  if (!user) {
    user = await User.create(profile);
  }

  user = user.toObject();

  const token = jwt.sign(user, config.jwtSecret);

  return res.json({ token, user: _.pick(user, ['email', 'name', 'picture']) });
}

module.exports = { googleLogin };
