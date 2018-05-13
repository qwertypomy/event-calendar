const httpStatus = require('http-status');
const _ = require('lodash');

const APIError = require('../helpers/APIError');
const User = require('../user/user.model');

const debug = require('debug')('event-calendar:user.controller'); // eslint-disable-line no-unused-vars

async function profile(req, res, next) {
  const user = await User.findById(req.user._id);
  if (!user) {
    const err = new APIError('Authorization error.', httpStatus.UNAUTHORIZED, true);
    return next(err);
  }
  return res.json({ user: _.pick(user.toObject(), ['email', 'name', 'picture']) });
}

module.exports = { profile };
