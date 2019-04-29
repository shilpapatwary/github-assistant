const axios = require('axios');
const githubUtil = require('../util/githubUtil');
const dbUtil = require('../util/dbUtil');

const authController = {
    setGithubLogin: (req, res, next) => {
        try {
          const domain  = process.env.DOMAIN || 'http://localhost:5000';
           res.set('Content-Type', 'application/json');
            res.status(200).send({"url": `https://github.com/login/oauth/authorize?client_id=${process.env.clientID}&scope=user%20public_repo&redirect_uri=${domain}/auth/redirect`});
          } catch (e) {
            next(e);
          }
    },
    getUser: (req, res, next) => {
        try{ 
          const query = require('url').parse(req.url,true).query;
            res.set('Content-Type', 'application/json');
            axios({
              method: 'post',
              url: `https://github.com/login/oauth/access_token?client_id=${process.env.clientID}&client_secret=${process.env.clientSecret}&code=${query.code}`,
              headers: {
                   accept: 'application/json'
              }
            }).then((response) => {
              const accessToken = response.data.access_token;
              githubUtil.getUserInfo(accessToken).then(user => {
                    dbUtil.getUserDetails(user, accessToken).then((response) => {
                        res.set('Authorization', `Bearer ${response.token}`);
                        res.cookie('token', response.token);
                        res.cookie('username', response.userData.username);
                        res.cookie('userid', response.userData.userid);
                        res.redirect('/');
                    });
               }); 
            })
          } catch(e) {
            next(e);
          }
    }
};

module.exports = authController;