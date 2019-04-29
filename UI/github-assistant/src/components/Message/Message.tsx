import React from 'react';
import {ChannelData, UserData, MessageData} from '../../redux/types';

interface MessageProps{
  message: MessageData,
  avatar: string,
  currentUser: UserData,
  isCurrentUser: boolean,
  editMessage: any,
  deleteMessage: any,
  channel: string
}
interface MessageState{
    messageInput: string,
    isDisabled: boolean
}
class Message extends React.Component<MessageProps, MessageState> {
  constructor(props: MessageProps) {
    super(props);
    this.state = {
     messageInput: this.props.message.messageValue,
     isDisabled: true
    },
    this.enableEditing = this.enableEditing.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
    this.handleInputText = this.handleInputText.bind(this);
    this.editMessage = this.editMessage.bind(this);
  }

  handleInputText(e: React.ChangeEvent<HTMLInputElement> ) {
    this.setState({messageInput: e.target.value});
  }

  enableEditing() {
    this.setState({isDisabled: false});
  }

  deleteMessage() {
    this.props.deleteMessage(this.props.channel, this.props.message.messageId);
  }

  editMessage(event: React.KeyboardEvent<HTMLInputElement>) {
    if(event.keyCode === 13) {
        this.setState({isDisabled: true});
        this.props.editMessage(this.props.channel, this.props.message.messageId, this.state.messageInput);
    }
  }
  componentWillReceiveProps(nextProps: any) {
    if(nextProps.message.messageId !== this.props.message.messageId){
      this.setState({messageInput: nextProps.message.messageValue});
    }
  }

  render() {
    return (
        <li className="message" key={this.props.message.messageId}>
        
        <div className="message__body">
            <span>
                <img className="message__avatar" src={this.props.avatar} alt="User Avatar"></img></span>
                <span className="messageSection">
                <div className="message__username">{this.props.currentUser && this.props.currentUser.username}</div>
                <div className="message__value"><input className='message__text' type="text" disabled={this.state.isDisabled} value={this.state.messageInput} onChange={this.handleInputText} onKeyDown={this.editMessage} aria-label="Sent Message" /></div>
            </span>
        </div>
        {this.props.isCurrentUser && (<div className="message__actions">
            <i className="fa fa-pencil-square-o" onClick={this.enableEditing}></i>
            <i className="fa fa-trash-o" onClick={this.deleteMessage}></i>
        </div>)}
      </li>
    )
  }
  
}

export default Message;