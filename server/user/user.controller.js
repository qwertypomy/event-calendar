const _ = require('lodash');
const debug = require('debug')('event-calendar:user.controller'); // eslint-disable-line no-unused-vars

async function profile({ user }, resolve, reject) {
  debug('user', user);
  const populatedUser = await user
    .populate('events', ['_id', 'title', 'start', 'duration', 'created_at'])
    .execPopulate();
  resolve({
    events: populatedUser.events,
    user: _.pick(populatedUser, ['email', 'name', 'picture'])
  });
}

module.exports = { profile };
