const dbUtil = require('../util/dbUtil');
const userController = {

    getAllUsers: function(req, res) {
      try {
        dbUtil.getAllUsers().then((users) => {
          res.set('Content-Type', 'application/json');
          res.status(200).send(users);
        })
      } catch(e) {
        next(e);
      }
    },
    
    updateUser: function(req, res) {
        try{
            const chatData = {
                userId: req.body.userId,
                channelId: req.body.channelId
            }
            dbUtil.updateChatDataInUser(req.params.id, chatData).then((user) => {
                res.set('Content-Type', 'application/json');
                res.status(201).send(user);
            });
        } catch(e){
          console.log(e)
            next(e);
        }
    }
    
}

module.exports = userController;