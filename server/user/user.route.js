const express = require('express');
const validate = require('express-validation');

const { checkAuthExpress: checkAuth } = require('../helpers/checkAuth');
const { expressHandler } = require('../helpers/reqHandler');
const paramValidation = require('../../config/param-validation');
const userCtrl = require('./user.controller');

const router = express.Router(); // eslint-disable-line new-cap

router
  .route('/profile')
  .get(validate(paramValidation.profile), checkAuth, expressHandler(userCtrl.profile));

module.exports = router;
