const _ = require('lodash');

const Event = require('./event.model');

const debug = require('debug')('event-calendar:event.controller'); // eslint-disable-line no-unused-vars

async function createEvent({ user, body: { start, duration, title } }, res) {
  const event = await Event.create({ start, duration, title });
  debug(event);
  user.events.push(event._id);
  debug(user);
  await user.save();
  return res.json({ event: _.pick(event, ['_id', 'title', 'start', 'duration', 'created_at']) });
}

async function deleteEvent({ user, params: { id } }, res) {
  const event = await Event.findByIdAndRemove(id).exec();
  _.remove(user.events, eventId => eventId === event._id);
  await user.save();
  debug(event);
  return res.json({ event: _.pick(event, ['_id', 'title', 'start', 'duration', 'created_at']) });
}

module.exports = { createEvent, deleteEvent };
