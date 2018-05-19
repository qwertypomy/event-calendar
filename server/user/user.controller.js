const _ = require('lodash');

async function profile({ user }, res) {
  const populatedUser = await user
    .populate('events', ['_id', 'title', 'start', 'duration', 'created_at'])
    .execPopulate();
  return res.json({
    events: populatedUser.events,
    user: _.pick(populatedUser, ['email', 'name', 'picture'])
  });
}

module.exports = { profile };
