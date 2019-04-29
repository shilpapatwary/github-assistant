import React from 'react';
import { connect } from 'react-redux';
import {Dispatch} from 'redux'
import { createChannel } from '../../redux/actions';
import {ChannelData} from '../../redux/types';

interface ChannelProps{
  createNewChannel: any
}
interface ChannelState{

}
class NewChannel extends React.Component<ChannelProps, ChannelState> {
  constructor(props: ChannelProps){
    super(props);
    this.handleCreateNewChannel = this.handleCreateNewChannel.bind(this);
    this.toggleCreateNewChannel = this.toggleCreateNewChannel.bind(this);
  }
  
  handleCreateNewChannel(e: any){
    e.preventDefault();
    this.props.createNewChannel({channelName: e.target.elements[0].value, userChannel: false});
    e.target.reset();
    const newChannelForm = document.querySelector('.newChannelForm')!;
    newChannelForm.classList.add('hide');
  }
  
  toggleCreateNewChannel(e: any){
    e.preventDefault();
    document.getElementsByClassName('newChannelForm')[0].classList.toggle("hide");
    const userListWrapper = document.querySelector('.user-list-wrapper')!;
    userListWrapper.classList.add('hide');
  }
  
  render(){
    return (<div className="create-new-channel">
      <button className="fa fa-plus-circle add-channel-btn" onClick={this.toggleCreateNewChannel} value="Add Channel" aria-label="Add new Channel"></button>
      
      <form onSubmit={this.handleCreateNewChannel} className="newChannelForm hide">
        <input className="new-channel-input" id="new-channel-input" placeholder="@Channel Name" type="text" required autoFocus />
        <label htmlFor="new-channel-input" className="hidden">New Channel</label>
        <input className="submit-new-channel btn btn-primary" type="submit" value="Create new Channel" />
      </form>
    </div>)
  }
}

function mapDispatchToProps (dispatch: Dispatch) {
  return {
    createNewChannel: (channel:ChannelData) => (dispatch(createChannel(channel)))
  }
}

export default connect(null, mapDispatchToProps)(NewChannel)