const express = require('express');
const channelsController = require('../controllers/channelsController');

const router = express.Router();

router.route('/')
  .get(channelsController.getAllChannels)
  .post(channelsController.createChannel);
router.route('/:id')
 .put(channelsController.updateChannel);
router.route('/:id/messages')
 .put(channelsController.editMessages)
 .delete(channelsController.deleteMessages)

module.exports = router;
