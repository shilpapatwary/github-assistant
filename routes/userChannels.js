const express = require('express');
const path = require('path');
const userController = require('../controllers/userController');

const router = express.Router();

router.route('/')
  .get(userController.getAllUsers);
  
router.route('/:id')
  .put(userController.updateUser);

module.exports = router;
