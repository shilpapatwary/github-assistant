const dbUtil = require('../util/dbUtil');
const axios = require('axios');

const gitbotController = {

    createRepo: function(req, res) {
        try{
            const repoData = req.body,
                  channelId = req.params.id,
                  currentUser = ''+req.cookies.userid;
            dbUtil.getGithubDetails(currentUser).then((user) => {
                axios({
                    method: 'post',
                    url: `https://api.github.com/user/repos`,
                    headers: {
                         "accept": 'application/json',
                         "Authorization": `token ${user.github_token}`,
                         "X-OAuth-Scopes": "repo, user"
                    },
                    data: repoData
                  }).then((repo) => {
                      const newMessage = {
                        messageId : '' + Math.round(Math.random()*1000),
                        messageValue: ` Created github repo -- ${repo.data.name} @ ${repo.data.html_url}`,
                        user: 'gitbot'
                      }
                      dbUtil.updateMessageInChannel(channelId, newMessage).then((channel) => {
                        res.set('Content-Type', 'application/json');
                        res.status(201).send(channel);
                    });
                  }).catch(e => {console.log(e)});
            }).catch(e => console.log(e));
        } catch(e) {
            next(e);
        }
    },

    addUser: function(req, res) {
        try{
            const userData = req.body,
                  channelId = req.params.id,
                  currentUser = req.cookies.userid;
                  
            dbUtil.getGithubDetails(currentUser).then((user) => {
                axios({
                    method: 'put',
                    url: `https://api.github.com/repos/${user.username}/${userData.repo}/collaborators/${userData.username}`,
                    headers: {
                         "accept": 'application/json',
                         "Authorization": `token ${user.github_token}`,
                         "X-OAuth-Scopes": "repo, user",
                         "Content-Length": "0"
                    }
                  }).then((response) => {
                      const newMessage = {
                        messageId : '' + Math.round(Math.random()*1000),
                        messageValue: ` New collaborator -- ${userData.username} added to repo ${response.data.html_url}`,
                        user: 'gitbot'
                      }
                      dbUtil.updateMessageInChannel(channelId, newMessage).then((channel) => {
                        res.set('Content-Type', 'application/json');
                        res.status(201).send(channel);
                    });
                  }).catch(e => console.log(e));
            });
        }catch(e) {
            next(e);
        }
    },

    reportIssue: function(req, res) {
        try{
            const issueData = req.body,
                  channelId = req.params.id,
                  currentUser = req.cookies.userid;
                  
            dbUtil.getGithubDetails(currentUser).then((user) => {
                axios({
                    method: 'POST',
                    url: `https://api.github.com/repos/${user.username}/${issueData.repo}/issues`,
                    headers: {
                         "accept": 'application/json',
                         "Authorization": `token ${user.github_token}`,
                         "X-OAuth-Scopes": "repo, user"
                    },
                    data: issueData.issue
                  }).then((response) => {
                      const newMessage = {
                        messageId : '' + Math.round(Math.random()*1000),
                        messageValue: ` Added issue --- "${response.data.title}" to repo ${response.data.repository_url}`,
                        user: 'gitbot'
                      }
                      dbUtil.updateMessageInChannel(channelId, newMessage).then((channel) => {
                        res.set('Content-Type', 'application/json');
                        res.status(201).send(channel);
                    });
                  }).catch(e => console.log(e));
            });
        }catch(e) {
            next(e);
        }
    },

    getIssues: function(req, res) {
        try{
            const repoData = req.body,
                  channelId = req.params.id,
                  currentUser = req.cookies.userid;
                  
            dbUtil.getGithubDetails(currentUser).then((user) => {
                axios({
                    method: 'GET',
                    url: `https://api.github.com/repos/${user.username}/${repoData.repo}/issues`,
                    headers: {
                         "accept": 'application/json',
                         "Authorization": `token ${user.github_token}`,
                         "X-OAuth-Scopes": "repo, user"
                    }
                  }).then((response) => {
                      const openIssues = response.data.filter(i => i.state === 'open'),
                            issueTitles = openIssues.map(o => o.title);

                      const newMessage = {
                        messageId : '' + Math.round(Math.random()*1000),
                        messageValue: ` Open issues @ ${response.config.url} -------------- "${issueTitles.join(',')}"`,
                        user: 'gitbot'
                      }
                      dbUtil.updateMessageInChannel(channelId, newMessage).then((channel) => {
                        res.set('Content-Type', 'application/json');
                        res.status(201).send(channel);
                    });
                  }).catch(e => console.log(e));
            });
        }catch(e) {
            next(e);
        }
    }
}

module.exports = gitbotController;