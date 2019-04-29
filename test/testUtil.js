const UserModel = require('../model/user');
const ChannelModel = require('../model/channelModel');
const util = {}
const options = { upsert: true, new: true, setDefaultsOnInsert: true };

util.createTestUser = () => {
    const user = {
        username: "fsdtest",
        userId: "48270905",
        password: "$2a$10$86UU9l/js9mpivSrCd6JYueTexjL1iJ19IcDfpMBPeMgGtvuzQzwW",
        github_token: "f08b6ebb44ae3a0b4e2a6cb84f1e686aff5218fa",
        chatData: []
       };
    return new Promise((resolve, reject) => {
        UserModel.findOneAndUpdate({userId:"48270905"}, user, options, (error, result) =>  {
            if (error) reject(error);
            resolve(result);
            });
    })
}

util.createChannel = () => {
    const channel = {
        channelId: '12345',
        channelTitle: 'sample',
        userChannel: false,
        messages: []
    };
    return new Promise((resolve, reject) => {
        ChannelModel.findOneAndUpdate({ channelId: '12345'}, channel, options, (error, result) =>  {
            if (error) reject(error);
            resolve(result.channelId);
        });
    })
    
}

module.exports = util;