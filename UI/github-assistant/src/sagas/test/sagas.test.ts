import chai from 'chai';
import { call } from 'redux-saga/effects';
import { loginInfoAsync, getAllChannelsAsync, createChannelAsync, sendMessageAsync, createGitRepoAsync, createGitAddUserAsync, createIssueAsync, getOpenIssuesAsync, getAllUsersAsync } from '../sagas';
import {fetchLoginInfo, retrieveChannels, saveNewChannel, saveNewMessage, createGitRepo, addUsersToGitRepo, createGitIssue, getOpenIssues, retrieveUsers} from '../apis';

chai.should();

describe('sagas', () => {
    
    describe('Login', () => {
        it('should call login API', () => {
            const loginInfoSaga = loginInfoAsync();
            loginInfoSaga.next().value.should.deep.equal(call(fetchLoginInfo));
        });
    });
    
    describe('Channels', () => {
        it('should call retrieveChannels API', () => {
            const getAllChannelsSaga = getAllChannelsAsync();
            getAllChannelsSaga.next().value.should.deep.equal(call(retrieveChannels));
        });
        it('should call saveNewChannel API', () => {
            const channel = {channelName: "sample", userChannel: false};
            const saveNewChannelSaga = createChannelAsync(channel);
            saveNewChannelSaga.next().value.should.deep.equal(call(saveNewChannel, channel));
        });
        it('should call saveNewMessage API', () => {
            const message = {channelId: "123", newMessageValue: "hi"};
            const saveNewMessageSaga = sendMessageAsync(message);
            saveNewMessageSaga.next().value.should.deep.equal(call(saveNewMessage, message));
        });
    });
    
    describe('Users', () => {
        it('should call retrieveUsers API', () => {
            const getAllUsersSaga = getAllUsersAsync();
            getAllUsersSaga.next().value.should.deep.equal(call(retrieveUsers));
        });
    });

    describe('Gitbot APIS', () => {
        it('should call createGitRepo API', () => {
            const data = {
                name: `Sample-Repo-1`,
                private: false
            };
            const createGitRepoSaga = createGitRepoAsync(data);
            createGitRepoSaga.next().value.should.deep.equal(call(createGitRepo, data))
        });
        it('should call addUsersToGitRepo API', () => {
            const data = {
                repo: `Sample-Repo-1`,
                username: "shilpapatwary"
            };
            const addUsersToGitRepoSaga = createGitAddUserAsync(data);
            addUsersToGitRepoSaga.next().value.should.deep.equal(call(addUsersToGitRepo, data))
        });
        it('should call createGitIssue API', () => {
            const data = {
                issue: {title: "sample issue", body: "sample desc"},
                repo: `Sample-Repo-1`
            };
            const createGitIssueSaga = createIssueAsync(data);
            createGitIssueSaga.next().value.should.deep.equal(call(createGitIssue, data))
        });
        it('should call getOpenIssues API', () => {
            const data = {
                repo: `Sample-Repo-1`
            };
            const getOpenIssuesSaga = getOpenIssuesAsync(data);
            getOpenIssuesSaga.next().value.should.deep.equal(call(getOpenIssues, data))
        });
    });
    
})
