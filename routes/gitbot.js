const express = require('express');
const gitbotController = require('../controllers/gitbotController');

const router = express.Router();

router.route('/createrepo/:id')
 .put(gitbotController.createRepo);

 router.route('/adduser/:id')
 .put(gitbotController.addUser);

 router.route('/reportissue/:id')
 .put(gitbotController.reportIssue);

 router.route('/getissues/:id')
 .put(gitbotController.getIssues);


module.exports = router;
