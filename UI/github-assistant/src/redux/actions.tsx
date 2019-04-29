import { action } from 'typesafe-actions';
import { SlackActionTypes, LoggedInUserData } from './types';

export const getAllChannels = () => action(SlackActionTypes.GET_ALL_CHANNELS);
export const getAllUsers = () => action(SlackActionTypes.GET_ALL_USERS);
export const getAllChannelsAsync = (data: any) => action(SlackActionTypes.GET_ALL_CHANNELS_ASYNC, data);
export const getAllUsersAsync = () => action(SlackActionTypes.GET_ALL_USERS_ASYNC);
export const changeCurrentChannel = (channelId: string) => action(SlackActionTypes.CHANGE_CURRENTCHANNEL, channelId);
export const createChannel = (channel: any) => action(SlackActionTypes.CREATE_CHANNEL, channel);
export const createChannelAsync = (channel: any) => action(SlackActionTypes.CREATE_CHANNEL_ASYNC, channel);
export const sendMessage = (channelId: string, messageValue: string, currentUser: string) => action(SlackActionTypes.SEND_MESSAGE, {channelId, messageValue, currentUser});
export const sendMessageAsync = (data: any) => action(SlackActionTypes.SEND_MESSAGE_ASYNC, {data});
 
export const editMessage = (channelId: string, messageId: string, messageValue: string) => action(SlackActionTypes.EDIT_MESSAGE, {channelId, messageId, messageValue});

export const deleteMessage = (channelId: string, messageId: string) => action(SlackActionTypes.DELETE_MESSAGE, {channelId, messageId});

export const getLoginInfo = () => action(SlackActionTypes.LOGIN_INFO);
export const getLoginInfoAsync = (data: any) => action(SlackActionTypes.LOGIN_INFO_ASYNC, {data});
export const setLoggedInStatus = (user: LoggedInUserData) => action(SlackActionTypes.SET_LOGGEDIN_STATUS, {user});

export const gitCreateRepoAction = (channelId: string, repoData: any) => action(SlackActionTypes.GIT_CREATE_REPO, {channelId, repoData});
export const gitAddUserAction = (channelId: string, gitData: any) => action(SlackActionTypes.GIT_ADD_USER_ACTION, {channelId, gitData});
export const gitReportIssueAction = (channelId: string, issueData: any) => action(SlackActionTypes.GIT_REPORT_ISSUE_ACTION, {channelId, issueData});
export const gitGetOpenIssues = (channelId: string, repo: string) => action(SlackActionTypes.GIT_GET_OPEN_ISSUES_ACTION, {channelId, repo});

export const createUserChatData = (userId: string, counterUserId: string, signedUserName: string, counterUserName: string) => action(SlackActionTypes.CREATE_USER_CHAT_DATA, {userId, counterUserId, signedUserName, counterUserName});
export const setLogOutStatus = () => action(SlackActionTypes.SET_LOGOUT_STATUS); 