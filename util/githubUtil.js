const axios = require('axios');
const github = require('octonode');
const githubUtil = {};

githubUtil.getUserInfo = (token) => {
    try{
        const client = github.client(token);
        return new Promise(function(resolve, reject) {
            client.get('/user', {}, function (err, status, body, headers) {
                if (err) {
                    reject(err);
                } else {
                    resolve(body);
                }
            })
        })
    } catch(e) {
      console.log(e);
    }
}
module.exports = githubUtil;