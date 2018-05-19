const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const authCtrl = require('./auth.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/google').post(validate(paramValidation.googleLogin), authCtrl.googleLogin);

module.exports = router;
