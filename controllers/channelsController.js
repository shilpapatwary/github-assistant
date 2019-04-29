const dbUtil = require('../util/dbUtil');
const channelsController = {

    getAllChannels: function(req, res) {
        try{
            dbUtil.getAllChannels().then((channels) => {
                res.set('Content-Type', 'application/json');
                res.status(200).send(channels);
            })
        }catch(e) {
            next(e);
        }
    },

    updateChannel: function(req, res) {
        try{
            const newMessage = {
                messageId: ''+ Math.round(Math.random()*1000),
                messageValue: req.body.message,
                user: req.body.user
            }
            dbUtil.updateMessageInChannel(req.params.id, newMessage).then((channel) => {
                res.set('Content-Type', 'application/json');
                res.status(201).send(channel);
            });
        } catch(e){
            next(e);
        }
    },

    createChannel: function(req, res) {
        try{
            dbUtil.createChannel(req.body.payload).then((channel) => {
                res.set('Content-Type', 'application/json');
                res.status(200).send(channel);
            });
        } catch(e) {
            next(e);
        }        
    },

    editMessages: function(req, res) {
        try{
            dbUtil.editMessageInChannel(req.params.id, req.body).then((channel) => {
                res.set('Content-Type', 'application/json');
                res.status(201).send(channel);
            })
        } catch(e) {
            next(e);
        }
    },

    deleteMessages: function(req, res) {
        try{
            dbUtil.deleteMessageInChannel(req.params.id, req.body).then((channel) => {
                res.set('Content-Type', 'application/json');
                res.status(202).send(channel);
            })
        } catch(e) {
            next(e);
        }
    }
    
}

module.exports = channelsController;