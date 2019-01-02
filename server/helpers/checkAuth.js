const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');

const config = require('../../config/config');
const User = require('../user/user.model');

const { soapReject, expressReject } = require('./reqHandler');

async function checkAuth(args, headers, resolve, reject) {
  const token = headers.authorization;
  if (!token) {
    return reject('No token provided.', httpStatus.UNAUTHORIZED);
  }
  try {
    const { _id } = await jwt.verify(token, config.jwtSecret);
    const user = await User.findById(_id).exec();
    if (!user) {
      return reject("User doesn't exist.", httpStatus.UNAUTHORIZED);
    }
    args.user = user; // eslint-disable-line no-param-reassign
    return resolve();
  } catch (error) {
    return reject('Invalid auth token.', httpStatus.UNAUTHORIZED);
  }
}

function checkAuthExpress(req, res, next) {
  req.user = 'jopa';
  checkAuth(req, req.headers, next, expressReject(next));
}

function checkAuthSOAP(args, headers, callback) {
  checkAuth(args, headers, callback, soapReject);
}

module.exports = { checkAuthExpress, checkAuthSOAP };
