const express = require('express');
const authRoutes = require('./server/auth/auth.route');
const userRoutes = require('./server/user/user.route');
const eventRoutes = require('./server/event/event.route');

const router = express.Router(); // eslint-disable-line new-cap

// TODO: use glob to match *.route files

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => res.send('OK'));

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/events', eventRoutes);

module.exports = router;
