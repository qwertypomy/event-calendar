const jwt = require('jsonwebtoken');
const config = require('../../config/config');

const debug = require('debug')('event-calendar:checkAuth'); // eslint-disable-line no-unused-vars

async function checkAuth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      message: 'No token provided.'
    });
  }
  try {
    const user = await jwt.verify(token, config.jwtSecret);
    req.user = user; // eslint-disable-line no-param-reassign
    return next();
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid auth token.'
    });
  }
}

module.exports = checkAuth;
