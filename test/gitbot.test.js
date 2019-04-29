const request = require('supertest');
const chai = require('chai');
const mocha = require('mocha');
const app = require('../server');
const jwt = require('jsonwebtoken');
const expect = chai.expect;

const util = require('./testUtil');
const should = chai.should();
var data = {};
const repo = `${Math.round(Math.random()* 1000)}`;
describe('\n Gitbot application', () => {
    before((done) => {
        util.createTestUser().then((res) => {
            data.user = res;
            data.token = jwt.sign(JSON.parse(JSON.stringify({userId: res.id})), "secret", { expiresIn: 600000 });
            util.createChannel().then((channelId) => {
                data.channelId = channelId
                done();
            }).catch((e) => {
                console.log(e);
                done()});
        }).catch((e) => {
            console.log(e);
            done()});
    })
   it('return a success message to channel after creating github repo', (done) => {
        request(app)
            .put(`/api/gitbot/createrepo/${data.channelId}`)
            .send({
                name: `Sample-Repo-${repo}`,
                private: false
            })
            .set('Cookie', `userid=${data.user.userId};token=${data.token}`)
            .set('Authorization', `Bearer ${data.token}`)
            .expect('content-type', /json/)
            .expect(201)
            .end((error, res) => {
               should.exist(res.body);
               should.not.exist(error);
               res.body.should.have.property('messages');
               expect(res.body.messages).to.not.be.empty;
               expect((res.body.messages[0].messageValue)).to.include.any.string(repo);
               should.exist(res);
               done();
            });
    });

    it('return a success message to channel after creating an issue', (done) => {
        request(app)
            .put(`/api/gitbot/reportissue/${data.channelId}`)
            .send({
                issue: {title: "sample issue", body: "sample desc"},
                repo: `Sample-Repo-${repo}`
            })
            .set('Cookie', `userid=${data.user.userId};token=${data.token}`)
            .set('Authorization', `Bearer ${data.token}`)
            .expect('content-type', /json/)
            .expect(201)
            .end((error, res) => {
               should.exist(res.body);
               should.not.exist(error);
               res.body.should.have.property('messages');
               expect((res.body.messages[1].messageValue)).to.include.any.string(repo);
               expect((res.body.messages[1].messageValue)).to.include.any.string("sample issue");
               should.exist(res);
               done();
            });
    });

    it('return list of open issues to channel', (done) => {
        request(app)
        .put(`/api/gitbot/getissues/${data.channelId}`)
        .send({
            repo: `Sample-Repo-${repo}`
        })
        .set('Cookie', `userid=${data.user.userId};token=${data.token}`)
        .set('Authorization', `Bearer ${data.token}`)
        .expect('content-type', /json/)
        .expect(201)
        .end((error, res) => {
           should.exist(res.body);
           should.not.exist(error);
           res.body.should.have.property('messages');
           expect((res.body.messages[2].messageValue)).to.include.any.string(repo);
           expect((res.body.messages[2].messageValue)).to.include.any.string("Open issues");
           should.exist(res);
           done();
        });
    });

    it('return a success message to channel after adding users as collaborators', (done) => {
        request(app)
        .put(`/api/gitbot/adduser/${data.channelId}`)
        .send({
            repo: `Sample-Repo-${repo}`,
            username: "shilpapatwary"
        })
        .set('Cookie', `userid=${data.user.userId};token=${data.token}`)
        .set('Authorization', `Bearer ${data.token}`)
        .expect('content-type', /json/)
        .expect(201)
        .end((error, res) => {
           should.exist(res.body);
           should.not.exist(error);
           res.body.should.have.property('messages');
           expect((res.body.messages[3].messageValue)).to.include.any.string(repo);
           expect((res.body.messages[3].messageValue)).to.include.any.string("New collaborator");
           should.exist(res);
           done();
        });
    });
})