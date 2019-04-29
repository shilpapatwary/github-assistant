const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userschema = mongoose.Schema({
  username: String,
  userId: String,
  password: String,
  github_token: String,
  chatData: Array,
  avatar: String
});


const userModel = mongoose.model('user', userschema);

module.exports = userModel;

module.exports.getUserById = (uid, cb) => {
  userModel.findOne({ userId: uid }, cb);
};

module.exports.getById = (id, cb) => {
  userModel.findOne({ _id: id }, cb);
};

module.exports.getUserByName = (uname, cb) => {
  userModel.findOne({ username: uname }, cb);
}

module.exports.createUser = (newUser, cb) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (e, hash) => {
      if (e) throw err;
      // eslint-disable-next-line no-param-reassign
      newUser.password = hash;
      //newUser.save(cb);
      const options = { upsert: true, new: true, setDefaultsOnInsert: true };
      userModel.findOneAndUpdate({userId: newUser.userId}, newUser,options, cb);
    });
  });
};

module.exports.updateUser = (data, cb ) => {
    const update = { $push: { chatData: {"userId": data.chatData.userId, "channelId": data.chatData.channelId} } };
    userModel.findOneAndUpdate({userId: data.userId}, update, {new: true}, cb);
}

module.exports.getAllUsers = (cb) => {
    userModel.find(cb);
}
