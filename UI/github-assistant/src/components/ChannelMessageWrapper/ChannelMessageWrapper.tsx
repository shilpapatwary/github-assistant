import React from 'react';
import {ChannelData, UserData} from '../../redux/types';
import Message from '../Message/Message';
import botIcon from '../../assets/images/bot.png'
interface MessageProps{
  inContextChannelDetails: ChannelData,
  usersList: UserData[],
  editMessage: any,
  currentUser: any
  deleteMessage: any
}

const ChannelMessages = (props: MessageProps) => {
  let channelHeading = props.inContextChannelDetails ? `Channel# ${props.inContextChannelDetails.channelTitle}` : null;
  if(props.inContextChannelDetails && props.inContextChannelDetails.userChannel && props.currentUser){
    const titles = props.inContextChannelDetails.channelTitle.split("_");
    const displayableTitle = titles[0] === props.currentUser.name ? titles[1] : titles[0];
    channelHeading = displayableTitle;
  }
  const messageItem = props.inContextChannelDetails && props.inContextChannelDetails.messages && props.inContextChannelDetails.messages.map((message, index) => {
  const currentUser = props.usersList.filter(u => u.userId === message.user)[0];
  const avatar = currentUser && (currentUser.userId === "gitbot" ? botIcon : currentUser.avatar);
  const isCurrentUser = currentUser.userId === props.currentUser.id;
    return <Message key={index} message={message} isCurrentUser={isCurrentUser} channel={props.inContextChannelDetails.channelId} avatar={avatar} currentUser={currentUser} editMessage={props.editMessage} deleteMessage={props.deleteMessage}></Message>
  });
  return (
    <div className="channel-message-wrapper">
      {props.inContextChannelDetails ? <h3>{channelHeading}</h3> : ''}
      <ul>
        {messageItem}
      </ul>
    </div>
  )
}

export default ChannelMessages;