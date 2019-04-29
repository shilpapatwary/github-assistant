const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.route('/login')
  .get(authController.setGithubLogin);

router.route('/redirect')
      .get(authController.getUser);
router.route('/user/:code')
  .get(authController.getUser);

module.exports = router;
