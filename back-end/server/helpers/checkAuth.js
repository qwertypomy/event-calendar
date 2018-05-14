const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const User = require('../user/user.model');

async function checkAuth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      message: 'No token provided.'
    });
  }
  try {
    const { _id } = await jwt.verify(token, config.jwtSecret);
    const user = await User.findById(_id).exec();
    if (!user) {
      return res.status(401).json({
        message: "User doesn't exist."
      });
    }
    req.user = user; // eslint-disable-line no-param-reassign
    return next();
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid auth token.'
    });
  }
}

module.exports = checkAuth;
