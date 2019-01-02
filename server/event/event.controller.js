const _ = require('lodash');
const debug = require('debug')('event-calendar:event.controller'); // eslint-disable-line no-unused-vars

const Event = require('./event.model');

async function createEvent({
  user, start, duration, title
}, resolve, reject) {
  const event = await Event.create({ start, duration, title });
  debug(event);
  user.events.push(event._id);
  debug(user);
  await user.save();
  resolve({ event: _.pick(event, ['_id', 'title', 'start', 'duration', 'created_at']) });
}

async function deleteEvent({ user, id }, resolve, reject) {
  const event = await Event.findByIdAndRemove(id).exec();
  _.remove(user.events, eventId => eventId === event._id);
  await user.save();
  debug(event);
  resolve({ event: _.pick(event, ['_id', 'title', 'start', 'duration', 'created_at']) });
}

module.exports = { createEvent, deleteEvent };
