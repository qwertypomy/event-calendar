const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const eventCtrl = require('./event.controller');

const checkAuth = require('../helpers/checkAuth');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/').post(validate(paramValidation.createEvent), checkAuth, eventCtrl.createEvent);
router.route('/:id').delete(validate(paramValidation.deleteEvent), checkAuth, eventCtrl.deleteEvent);

module.exports = router;
