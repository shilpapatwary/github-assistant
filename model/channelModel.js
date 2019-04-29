const mongoose = require('mongoose');

const channelSchema = mongoose.Schema({
    channelId: String,
    channelTitle: String,
    userChannel: Boolean,
    messages: Array
});


const channelModel = mongoose.model('channels', channelSchema);

module.exports = channelModel;

module.exports.getAllChannels = (cb) => {
    channelModel.find(cb);
}
module.exports.getChannelById = (id, cb) => {
    channelModel.findOne({ channelId: id }, cb);
}
module.exports.createChannel = (newChannel, cb) => {
    newChannel.save(cb);
};
module.exports.updateChannel = (data, cb ) => {
    const options = { new: true };
    const update = { $push: { messages: data.message } };
    channelModel.findOneAndUpdate({channelId: data.channelId}, update, options, cb);
};
module.exports.updateMessageInChannel = (data, cb) => {
    channelModel.update({"channelId":data.channelId, "messages.messageId": data.message.messageId},
    {$set: {"messages.$.messageValue": data.message.messageValue}}, cb);
};
module.exports.deleteMessageInChannel = (data, cb) => {
    channelModel.update({"channelId":data.channelId},
{ $pull: {messages:{messageId:data.message.messageId}}},
    { multi: true }, cb)
};

