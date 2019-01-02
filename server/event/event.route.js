const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const { expressHandler } = require('../helpers/reqHandler');
const eventCtrl = require('./event.controller');

const { checkAuthExpress: checkAuth } = require('../helpers/checkAuth');

const router = express.Router(); // eslint-disable-line new-cap

router
  .route('/')
  .post(validate(paramValidation.createEvent), checkAuth, expressHandler(eventCtrl.createEvent));
router
  .route('/:id')
  .delete(validate(paramValidation.deleteEvent), checkAuth, expressHandler(eventCtrl.deleteEvent));

module.exports = router;
