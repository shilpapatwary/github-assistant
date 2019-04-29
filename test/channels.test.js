const request = require('supertest');
const chai = require('chai');
const app = require('../server');
const jwt = require('jsonwebtoken');
const ChannelsModel = require('../model/channelModel');
const util = require('./testUtil');

const should = chai.should();
const newChannel={
    channelId: '123',
    channelTitle: 'sample',
    userChannel: false,
    messages: []
}
var loggedInUser = {};
describe('\n Channels', () => {
   before((done) => {
    util.createTestUser().then((res) => {
        loggedInUser.data = res;
        loggedInUser.token = jwt.sign(JSON.parse(JSON.stringify({userId: res.id})), "secret", { expiresIn: 600000 })
        done();
    }).catch(e => console.log(e))
   });
    it('should retrieve all channels', () => {
        request(app)
            .get('/api/channels')
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

    it('should create channel add message to it', () => {
        request(app)
            .post('/api/channels')
            .set('Cookie', `token=${loggedInUser.token}`)
            .set('Authorization', `Bearer ${loggedInUser.token}`)
            .send({payload:newChannel})
              .expect('content-type', /json/)
              .expect(200)
              .end((error, res) => {
                should.exist(res.body);
                should.not.exist(error);
                res.body.should.have.property('channelId');
                should.exist(res);
            });
        });
    it('should update channel with messages', () => {
            const channel = new ChannelsModel(newChannel);
            channel.save((err, ch) => {
                request(app)
                .put(`/api/channels/${ch.channelId}`)
                .set('Cookie', `token=${loggedInUser.token}`)
                .set('Authorization', `Bearer ${loggedInUser.token}`)
                .send({message:"hi"})
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
    it('should retrieve login url', () => {
        request(app)
        .get('/auth/login')
        .expect('content-type', /json/)
        .expect(200)
        .end((err, res) => {
            should.exist(res.body);
            should.not.exist(err);
            res.body.should.have.property('url');
        });
    })
    
})