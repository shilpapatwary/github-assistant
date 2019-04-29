const jwt = require('jsonwebtoken');
const userModel = require('../model/user');
const channelModel = require('../model/channelModel');

const dbUtil = {};

dbUtil.getUserDetails = (user, accessToken) => {
    try{
        return new Promise(function(resolve, reject) {
            const newUser = {
                username: user.login,
                userId: user.id,
                password: `${user.login}${user.id}`,
                github_token: accessToken,
                chatData: [],
                avatar: user.avatar_url
            };
            userModel.createUser(newUser, (err, newUsr) => {
                if(err) reject(err);
                resolve({
                    token: jwt.sign(JSON.parse(JSON.stringify({userId: newUsr.id})), "secret", { expiresIn: 600000 }),
                    userData: {"username": newUser.username, "userid": newUser.userId}
                });
            });
        })
    } catch(e) {
      console.log(e);
    }
}

dbUtil.createChannel = (channel) => {  
    return new Promise((resolve, reject) => {
        const newChannel = new channelModel({
            channelTitle: channel.channelName,
            channelId: channel.channelId || `${Math.round(Math.random() * 1000)}`, 
            userChannel: channel.userChannel,
            messages: []
        });
        channelModel.createChannel(newChannel, (err, res) => {
            if(err) reject(err);
            resolve(res);
        });
    });
}

dbUtil.updateMessageInChannel = (channelId, message) => {
    return new Promise((resolve, reject) => {
        channelModel.updateChannel({channelId, message}, (err, res) => {
            if(err) reject(err);
            resolve(res);
        });
    })
}

dbUtil.updateChatDataInUser = (userId, chatData) => {
    return new Promise((resolve, reject) => {
        userModel.updateUser({userId, chatData}, (err, res) => {
            if(err) {
              reject(err);
            }
            resolve(res);
        });
    })
}

dbUtil.getAllChannels = () => {
    return new Promise((resolve, reject) => {
        channelModel.getAllChannels((err, res) => {
            if(err) reject(err);
            resolve(res);
        })
    })
}

dbUtil.getGithubDetails = (user) => {
    return new Promise((resolve, reject) => {
        userModel.getUserById(user, (err, res) => {
            if(err) reject(err)
            resolve(res);
        });
    })
}


dbUtil.updateMessageInChannel = (channelId, message) => {
    return new Promise((resolve, reject) => {
        channelModel.updateChannel({channelId, message}, (err, res) => {
            if(err) reject(err);
            resolve(res);
        });
    })
}

dbUtil.getAllChannels = () => {
    return new Promise((resolve, reject) => {
        channelModel.getAllChannels((err, res) => {
            if(err) reject(err);
            resolve(res);
        })
    })
}

dbUtil.getAllUsers = () => {
    return new Promise((resolve, reject) => {
        userModel.getAllUsers((err, res) => {
            if(err) reject(err);
            resolve(res);
        })
    })
}

dbUtil.editMessageInChannel = (channelId, message) => {
    return new Promise((resolve, reject) => {
        channelModel.updateMessageInChannel({channelId, message}, (err, res) => {
            if(err) reject(err);
            if(res.nModified == 1){
                channelModel.getChannelById(channelId, (err, res) => {
                    if(err) reject(err);
                    resolve(res);
                })
            }
        })
    })
}
dbUtil.deleteMessageInChannel = (channelId, message) => {
    return new Promise((resolve, reject) => {
        channelModel.deleteMessageInChannel({channelId, message}, (err, res) => {
            if(err) reject(err);
            if(res.nModified == 1){
                channelModel.getChannelById(channelId, (err, res) => {
                    if(err) reject(err);
                    resolve(res);
                })
            }
        })
    })
}
module.exports = dbUtil;