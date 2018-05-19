const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');

const APIError = require('../helpers/APIError');
const config = require('../../config/config');
const User = require('../user/user.model');

async function checkAuth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    const err = new APIError('No token provided.', httpStatus.UNAUTHORIZED, true);
    return next(err);
  }
  try {
    const { _id } = await jwt.verify(token, config.jwtSecret);
    const user = await User.findById(_id).exec();
    if (!user) {
      const err = new APIError("User doesn't exist.", httpStatus.UNAUTHORIZED, true);
      return next(err);
    }
    req.user = user; // eslint-disable-line no-param-reassign
    return next();
  } catch (error) {
    const err = new APIError('Invalid auth token.', httpStatus.UNAUTHORIZED, true);
    return next(err);
  }
}

module.exports = checkAuth;
