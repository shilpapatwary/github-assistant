export enum SlackActionTypes {
  CHANGE_CURRENTCHANNEL = '@@types/CHANGE_CURRENTCHANNEL',
  CREATE_CHANNEL = '@@types/CREATE_CHANNEL',
  CREATE_CHANNEL_ASYNC = '@@types/CREATE_CHANNEL_ASYNC',
  SEND_MESSAGE = '@@types/SEND_MESSAGE',
  SEND_MESSAGE_ASYNC = '@@types/SEND_MESSAGE_ASYNC',
  EDIT_MESSAGE = '@@types/EDIT_MESSAGE',
  DELETE_MESSAGE = '@@types/DELETE_MESSAGE',
  LOGIN_INFO = '@@types/LOGIN_INFO',
  LOGIN_INFO_ASYNC = '@@types/LOGIN_INFO_ASYNC',
  SET_LOGGEDIN_STATUS = '@@types/SET_LOGGEDIN_STATUS',
  GET_ALL_CHANNELS = '@@types/GET_ALL_CHANNELS',
  GET_ALL_USERS = '@@types/GET_ALL_USERS',
  GET_ALL_CHANNELS_ASYNC = '@@types/GET_ALL_CHANNELS_ASYNC',
  GET_ALL_USERS_ASYNC = '@@types/GET_ALL_USERS_ASYNC',
  GIT_CREATE_REPO = '@@types/GIT_CREATE_REPO',
  GIT_ADD_USER_ACTION = '@@types/GIT_ADD_USER_ACTION',
  GIT_REPORT_ISSUE_ACTION ='@@types/GIT_REPORT_ISSUE_ACTION',
  GIT_GET_OPEN_ISSUES_ACTION = '@@types/GIT_GET_OPEN_ISSUES_ACTION',
  CREATE_USER_CHAT_DATA = '@@types/CREATE_USER_CHAT_DATA',
  CREATE_USER_CHAT_DATA_ASYNC = '@@types/CREATE_USER_CHAT_DATA_ASYNC',
  SET_LOGOUT_STATUS = "@@types/SET_LOGOUT_STATUS"
}

export interface IssueData{
  issue: object,
  repo: string
}
export interface RepoData{
  name: string,
  private: boolean
}
export interface MessageData {
  messageId: string,
  messageValue: string,
  user: string
}

export interface chatData {
  userid: string,
  channelId: string,
}

export interface ChannelData {
  channelId: string,
  channelTitle: string,
  userChannel: boolean,
  messages: MessageData[]
}

export interface UserData {
  userId: string,
  username: string,
  channelId: string,
  userChannel: boolean,
  messages: MessageData[],
  chatData: chatData[],
  avatar: string
}
export interface LoggedInUserData {
  id: string,
  name: string
}
export interface SlackApplicationState {
  channelsList?: ChannelData[],
  usersList?: UserData[],
  currentChannel?: string,
  isLoggedIn? : boolean,
  loginUrl? : string,
  currentUser? : LoggedInUserData
}