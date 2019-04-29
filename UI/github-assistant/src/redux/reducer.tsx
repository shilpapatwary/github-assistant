import { SlackApplicationState, SlackActionTypes } from './types';
import { AnyAction } from 'redux';

const initialState = {
  channelsList: undefined,
  usersList: undefined,
  currentChannel: undefined,
  isLoggedIn : undefined,
  loginUrl : undefined,
  currentUser : undefined
}

const SlackApplicationReducer = (currentState: SlackApplicationState = initialState, action: AnyAction) => {
  let exisintgList: any = [];
  let existingUserList: any = [];
  if(currentState.channelsList) {
    exisintgList = currentState.channelsList;
  }
  if(currentState.usersList) {
    existingUserList = currentState.usersList;
  }
  switch(action.type){
    case SlackActionTypes.LOGIN_INFO_ASYNC:
        return Object.assign({}, currentState, {loginUrl: action.data.url});
    
    case SlackActionTypes.SET_LOGGEDIN_STATUS:
        return Object.assign({}, currentState, {currentUser: action.payload.user, isLoggedIn: true});
    
    case SlackActionTypes.CHANGE_CURRENTCHANNEL:
        return Object.assign({}, currentState, {currentChannel: action.payload });
    
    case SlackActionTypes.CREATE_CHANNEL_ASYNC:
        return Object.assign({}, currentState, {channelsList: [...exisintgList, action.data]});

    case SlackActionTypes.GET_ALL_CHANNELS_ASYNC:
        return Object.assign({}, currentState, {channelsList: action.data});
        
    case SlackActionTypes.GET_ALL_USERS_ASYNC:
            const bot = [{userId: "gitbot",
                username: "GitBot"}];
            return Object.assign({}, currentState, {usersList: [...action.data, ...bot]});

    case SlackActionTypes.SEND_MESSAGE_ASYNC:
        let getNewEditedChannel = exisintgList.map((channel: any) => {
            if(channel.channelId === action.data.channelId){
                return Object.assign({}, channel, {messages: action.data.messages}
              );
            }
            return channel;
        });
        return Object.assign({}, currentState, {channelsList: [...getNewEditedChannel]});
        
    case SlackActionTypes.CREATE_USER_CHAT_DATA_ASYNC:
     
      let getEditedUser = existingUserList.map((user: any) => {
          if(user.userId === action.data.userOne.userId){
            console.log('1111', action.data.userOne.chatData)
              return Object.assign({}, user, {chatData: action.data.userOne.chatData});
          } else if(user.userId === action.data.userTwo.userId){
            console.log('2222', action.data.userTwo.chatData)
            return Object.assign({}, user, {chatData: action.data.userTwo.chatData})
          }
          return user;
      });
      return Object.assign({}, currentState, {channelsList: [...exisintgList, action.data.newChannel]}, {usersList: [...getEditedUser]});
      
    case SlackActionTypes.SET_LOGOUT_STATUS:
        return Object.assign({}, currentState, {isLoggedIn: false, currentUser: null });
        
    default:
      return currentState;
  }
}

export default SlackApplicationReducer;