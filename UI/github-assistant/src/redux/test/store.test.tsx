import chai from 'chai';
import store from './store';
import sampleJSON from './initialState.json';
import {SlackActionTypes} from '../types';
import {createChannelAsync, changeCurrentChannel, getLoginInfoAsync} from '../actions';
 
chai.should();
describe('SlackApplicationStore', function() {
  describe('store.dispatch(createChannel())', function() {
    it('should create an new channel', function() {
      store.dispatch(createChannelAsync({channelTitle: "sample channel", userChannel: false}));
      const channelsList =  store.getState().channelsList || [];
      channelsList.should.be.an('array').that.is.not.empty;
      channelsList.should.be.an('array').to.have.lengthOf(4);
    });
  });
  
  describe('store.dispatch(changeChannelAction()', function() {
    it('should change the curent channel ', function() {
      store.dispatch(changeCurrentChannel("101"));
    const currentChannel =  store.getState().currentChannel || {};
    currentChannel.should.not.be.empty;
    currentChannel.should.contain("101");
    });
  });
  describe('store.dispatch(getLoginInfoAsync()', function() {
    it('should add the github url to state ', function() {
      store.dispatch({type:SlackActionTypes.LOGIN_INFO_ASYNC, data:{url:"www.githublogin.com"}});
        const loginUrl =  store.getState().loginUrl || "";
        loginUrl.should.not.be.empty;
    });
  });
  describe('store.dispatch()', function() {
      it('should set channels to the state', () => {
        const channelsList = JSON.parse(JSON.stringify(sampleJSON)).channelsList;
        store.dispatch({type: SlackActionTypes.GET_ALL_CHANNELS_ASYNC, data:channelsList});
        const storeChannels = store.getState().channelsList || [];
        storeChannels.should.be.an('array').that.is.not.empty;
        storeChannels.should.be.an('array').to.have.lengthOf(3);
      });
  })
});

