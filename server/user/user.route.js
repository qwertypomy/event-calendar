const checkAuth = require('../helpers/checkAuth');

const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const userCtrl = require('./user.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/profile').get(validate(paramValidation.profile), checkAuth, userCtrl.profile);

module.exports = router;
