const jwt = require('jsonwebtoken');
const axios = require('axios');
const httpStatus = require('http-status');
const _ = require('lodash');

const config = require('../../config/config');
const User = require('../user/user.model');

async function googleLogin({ idToken }, resolve, reject) {
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
    reject('Authorization error.', httpStatus.UNAUTHORIZED);
  }

  let user = await User.findOne({ email: profile.email })
    .populate('events', ['_id', 'title', 'start', 'duration', 'created_at'])
    .exec();
  if (!user) {
    user = await User.create(profile);
  }

  const token = jwt.sign(_.pick(user, ['_id', 'email', 'name']), config.jwtSecret);

  resolve({
    token,
    events: user.events,
    user: _.pick(user, ['email', 'name', 'picture'])
  });
}

module.exports = { googleLogin };
