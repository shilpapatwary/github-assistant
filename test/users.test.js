const request = require('supertest');
const chai = require('chai');
const app = require('../server');
const jwt = require('jsonwebtoken');
const ChannelsModel = require('../model/channelModel');
const util = require('./testUtil');

const should = chai.should();
const newUser = {
  username: "fsdtest",
  userId: "48270905",
  password: "$2a$10$Zd.HYtLGjb40n7.5e.Qg4u0SU4eTtMwoGDWd5OLzqAKrEK33Orj.m",
  github_token: "843ec207ef8e77667a310608413c960a401bdf6c",
  chatData: []
}
const newUserChannel={
    channelId: '123',
    channelTitle: 'sample',
    userChannel: true,
    messages: []
}
var loggedInUser = {};
describe('\n Users', () => {
   before((done) => {
    util.createTestUser().then((res) => {
        loggedInUser.data = res;
        loggedInUser.token = jwt.sign(JSON.parse(JSON.stringify({userId: res.id})), "secret", { expiresIn: 600000 })
        done();
    }).catch(e => console.log(e))
   });
   
    it('should retrieve all users', () => {
        request(app)
            .get('/api/users')
            .set('Cookie', `token=${loggedInUser.token}`)
            .set('Authorization', `Bearer ${loggedInUser.token}`)
            .expect('content-type', /json/)
            .expect(200)
            .end((error, res) => {
                should.exist(res.body);
                res.body.should.be.a('Array');
                should.not.exist(error);
                should.exist(res);
            });
    });

    it('should update user channels with messages', () => {
            const channel = new ChannelsModel(newUserChannel);
            channel.save((err, ch) => {
                request(app)
                .put(`/api/channels/${ch.channelId}`)
                .set('Cookie', `token=${loggedInUser.token}`)
                .set('Authorization', `Bearer ${loggedInUser.token}`)
                .send({message:"hi new direct messaging"})
                .expect('content-type', /json/)
                .expect(201)
                .end((error, res) => {
                    should.exist(res.body);
                    should.not.exist(error);
                    res.body.should.have.property('messages');
                    should.exist(res);
                });
            })
        });
    
})