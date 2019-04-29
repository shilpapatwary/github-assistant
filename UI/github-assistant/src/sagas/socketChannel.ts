import {put, call, take, cancelled} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';
import {SlackActionTypes} from '../redux/types';

const createSocketChannel = (socket: any) => eventChannel((emit) => {
    const chatHandler = (data: any) => {
      emit({type: SlackActionTypes.SEND_MESSAGE_ASYNC, data: data});
    };
    const channelHandler = (data: any) => {
      emit({type:SlackActionTypes.CREATE_CHANNEL_ASYNC, data: data});
    }
    const userChannelHandler = (data: any) => {
      emit({type:SlackActionTypes.CREATE_USER_CHAT_DATA_ASYNC, data: data});
    }
    
    socket.on('chat', chatHandler);
    socket.on('channel', channelHandler);
    socket.on('userChannel', userChannelHandler);

    return () => {
      socket.off('chat', chatHandler);
      socket.off('channel', channelHandler);
      socket.off('userChannel', userChannelHandler);
    };
  });

  export const listenServerSaga = function* (socket: any) {
    try {
      const socketChannel = yield call(createSocketChannel, socket);
      while (true) {
        const payload: any = yield take(socketChannel);
        const data = payload.data;
        yield put({type: payload.type, data});
      }
    } catch (error) {
      console.log(error);
    } finally {
      if (yield cancelled()) {
        socket.disconnect(true);
      }
    }
  };
  