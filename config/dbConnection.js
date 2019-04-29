const mongoose = require('mongoose');

const devDbUrl = 'mongodb://localhost:27017/github-asst-db';
const mongoURI = process.env.MONGOLAB_URI || devDbUrl;
//const mongodbUri = 'mongodb://user:user123@ds255005.mlab.com:55005/slackgitbot';

mongoose.connect(mongoURI);
const conn = mongoose.connection;

conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', function() {
 console.log('Connected to DB!')
});

module.exports = mongoose;
