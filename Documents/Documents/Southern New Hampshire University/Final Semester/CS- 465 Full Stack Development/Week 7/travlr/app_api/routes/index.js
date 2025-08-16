const express = require('express');
const router = express.Router();

// Controllers
const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');

//  Use Passport instead of custom authenticateJWT
const passport = require('passport');

// ---- Public (no auth) ----
router.post('/register', authController.register);
router.post('/login', authController.login);

// ---- Protected (JWT required) ----
router
  .route('/trips')
  .get(tripsController.tripsList)
  .post(passport.authenticate('jwt', { session: false }), tripsController.tripsAddTrip);

router
  .route('/trips/:tripCode')
  .get(tripsController.tripsFindByCode)
  .put(passport.authenticate('jwt', { session: false }), tripsController.tripsUpdateTrip);

module.exports = router;
