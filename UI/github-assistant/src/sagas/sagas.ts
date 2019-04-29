import { takeEvery, put, call, fork } from 'redux-saga/effects';
import {SlackActionTypes} from '../redux/types';
import { fetchLoginInfo, saveNewChannel, saveNewMessage, retrieveChannels, retrieveUsers, createGitRepo, addUsersToGitRepo, createGitIssue, getOpenIssues, editMessage, deleteMessage, saveUserChatChannel } from './apis';
import io from 'socket.io-client';
import {listenServerSaga} from './socketChannel';
const socket = io();

export function* loginInfoAsync() {
  const data = yield call(fetchLoginInfo);
  yield put({type: SlackActionTypes.LOGIN_INFO_ASYNC, data});
}

export function* createChannelAsync(channel: any) {
  const data = yield call(saveNewChannel, channel); 
  socket.emit('channel', data);
}

export function* createUserChatChannelAsync(channel: any){
  const data = yield call(saveUserChatChannel, channel);
  socket.emit('userChannel', data);
}

function* watchLoginInfo() {
  yield takeEvery(SlackActionTypes.LOGIN_INFO, loginInfoAsync);
 }

function* watchCreateChannel() {
  yield takeEvery(SlackActionTypes.CREATE_CHANNEL, createChannelAsync);
}

export function* sendMessageAsync(messageData: any) {
  const data = yield call(saveNewMessage, messageData);
  socket.emit('chat', data);
}

function* watchSendMessage() {
  yield takeEvery(SlackActionTypes.SEND_MESSAGE, sendMessageAsync);
}

function* watchCreateUserChatChannel(){
  yield takeEvery(SlackActionTypes.CREATE_USER_CHAT_DATA, createUserChatChannelAsync)
}

export function* getAllChannelsAsync() {
  const data = yield call(retrieveChannels);
  yield put({type: SlackActionTypes.GET_ALL_CHANNELS_ASYNC, data})
}

export function* getAllUsersAsync() {
  const data = yield call(retrieveUsers);
  yield put({type: SlackActionTypes.GET_ALL_USERS_ASYNC, data})
}

function* watchGetAllChannels() {
  yield takeEvery(SlackActionTypes.GET_ALL_CHANNELS, getAllChannelsAsync);
}

function* watchGetAllUsers() {
  yield takeEvery(SlackActionTypes.GET_ALL_USERS, getAllUsersAsync);
}

export function* createGitRepoAsync(gitData: any) {
  const data = yield call(createGitRepo, gitData); 
  socket.emit('chat', data);
}

function* watchCreateGitRepo() {
  yield takeEvery(SlackActionTypes.GIT_CREATE_REPO, createGitRepoAsync);
}

export function* createGitAddUserAsync(gitData: any) {
  const data = yield call(addUsersToGitRepo, gitData); 
  socket.emit('chat', data);
}

function* watchAddUserAction() {
  yield takeEvery(SlackActionTypes.GIT_ADD_USER_ACTION, createGitAddUserAsync);
}

export function* createIssueAsync(gitData: any) {
  const data = yield call(createGitIssue, gitData );
  socket.emit('chat', data);
}

function* watchCreateIssueAction() {
  yield takeEvery(SlackActionTypes.GIT_REPORT_ISSUE_ACTION, createIssueAsync)
}

export function* getOpenIssuesAsync(gitData: any) {
  const data = yield call(getOpenIssues, gitData );
  socket.emit('chat', data);
}

function* watchGetOpenIssuesAction() {
  yield takeEvery(SlackActionTypes.GIT_GET_OPEN_ISSUES_ACTION, getOpenIssuesAsync)
}

function* editMesageAsync(messageData: any) {
  const data = yield call(editMessage, messageData);
  socket.emit('chat', data);
}

function* deleteMessageAsync(messageData: any) {
  const data = yield call(deleteMessage, messageData);
  socket.emit('chat', data);
}
function* watchEditMessageAction() {
  yield takeEvery(SlackActionTypes.EDIT_MESSAGE, editMesageAsync)
}

function* watchDeleteMessageAction() {
  yield takeEvery(SlackActionTypes.DELETE_MESSAGE, deleteMessageAsync)
}

export default function* root() {
  yield fork(listenServerSaga, socket)
  yield fork(watchLoginInfo)
  yield fork(watchCreateChannel)
  yield fork(watchSendMessage)
  yield fork(watchGetAllChannels)
  yield fork(watchGetAllUsers)
  yield fork(watchCreateGitRepo)
  yield fork(watchAddUserAction)
  yield fork(watchCreateIssueAction)
  yield fork(watchGetOpenIssuesAction)
  yield fork(watchEditMessageAction)
  yield fork(watchDeleteMessageAction)
  yield fork(watchCreateUserChatChannel)
}