import React from 'react';
import { connect } from 'react-redux';
import {Dispatch} from 'redux';
import { changeCurrentChannel, getAllChannels, getAllUsers, createUserChatData, createChannel } from '../../redux/actions';
import {UserData, ChannelData} from '../../redux/types';

interface ChannelListProps{
  getAllChannels: any,
  getAllUsers: any,
  changeChannel: any,
  createNewChatData: any,
  usersList: UserData[],
  channelList: ChannelData[],
  createNewChannel: any,
  currentChannel: string,
  currentUser: any
}
interface ChannelListState{

}
class ChannelList extends React.Component<ChannelListProps, ChannelListState>  {
  constructor(props: ChannelListProps){
    super(props);
    this.handleListChannel = this.handleListChannel.bind(this);
    this.toggleCreateNewMsgChannel = this.toggleCreateNewMsgChannel.bind(this);
  }
  
  toggleCreateNewMsgChannel(e:any){
    e.preventDefault();
    document.getElementsByClassName('user-list-wrapper')[0].classList.toggle("hide");
    const newChannelForm = document.querySelector('.newChannelForm')!;
    newChannelForm.classList.add('hide');
  }
  
  componentDidMount() {
    this.props.getAllChannels(); 
    this.props.getAllUsers();
  }

  handleListChannel(e: any){
    const channelId = e.target.parentElement.getAttribute('data-id');
    e.preventDefault();
    const userListWrapper = document.querySelector('.user-list-wrapper')!;
    if(userListWrapper) userListWrapper.classList.add('hide');
    if(channelId){
        this.props.changeChannel(e.target.parentElement.getAttribute('data-id'));
    } else { //Create `usersList.chatData` ==> Channel list between users
      const signedUserId = this.props.currentUser.id;
      const counterUserId = e.target.parentElement.dataset.userid;
      const signedUserName = this.props.currentUser.name;
      const counterUserName = e.target.textContent;
      if(signedUserId !== counterUserId){
        this.props.createNewChatData(signedUserId, counterUserId, signedUserName, counterUserName);
      } else {
        debugger; //Own msg
      }   
    }    
  }
  
  render(){
    //Channel list
    let channelList = this.props.channelList;
    let channelItem = 
    (channelList.length) ?
      channelList.map((channel) => {
      let activeToggle = (channel.channelId === this.props.currentChannel) ? 'active' : '';
      if(channel.channelTitle && !channel.userChannel){
        return <li data-id={channel.channelId} key={channel.channelId} className = {activeToggle}>
            <button className="channel-name" onClick={this.handleListChannel}>{channel.channelTitle}</button>
          </li>
      }        
    }) : <li className="no-data-li"><h3>No Channels, create new ones above</h3></li>;
    
    //Direct Channel list
    let channelUserList = this.props.channelList;
    let userChatItem = channelUserList.map((channel) => {
      let activeToggle = (channel.channelId === this.props.currentChannel) ? 'active' : '';
      if(channel.channelTitle && channel.userChannel && channel.channelTitle.includes(this.props.currentUser.name)){
        const titles = channel.channelTitle.split("_");
        const displayableTitle = titles[0] === this.props.currentUser.name ? titles[1] : titles[0];
        return <li data-id={channel.channelId} key={channel.channelId} className = {activeToggle}>
            <button className="channel-name" onClick={this.handleListChannel}>{displayableTitle}</button>
          </li>
      }
      })
    
    //Users list
    let userList = this.props.usersList;
    let userItem = 
    (userList.length) ?
      userList.map((user) => {
      let availableDirectChannels = user.chatData && user.chatData.map((chatdata) => chatdata.channelId);
      let uniqueAvailableDirectChannels = [...new Set(availableDirectChannels)];
      let activeToggle = (user.channelId === this.props.currentChannel) ? 'active' : '';
        if(user.userId === 'gitbot') return;
        return <li data-id={uniqueAvailableDirectChannels} data-userid={user.userId} key={user.userId} className = {activeToggle}>
            <button className="channel-name user-name" onClick={this.handleListChannel}>{user.username}</button>
          </li>
      }) : <li className="no-data-li"><h3>No Users, create new ones above</h3></li>;
                
    return (
      <>
        <div className="channel-list-wrapper">
          <h2>Channels</h2>
          <ul>
            {channelItem}
          </ul>
        </div>
        
        <hr />
        <div className="channel-list-wrapper">
          <h2>Direct Messaging<button className="fa fa-plus-circle addUsersButton"  onClick={this.toggleCreateNewMsgChannel} value="Add User Channel" aria-label="Add new User Channel"></button></h2>         
          <ul>
            {userChatItem}
          </ul>
        </div>
        
        <hr />
        <div className="channel-list-wrapper user-list-wrapper hide">
          <h3>Available users</h3>
          <ul>
            {userItem}
          </ul>
        </div>
      </>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    channelList: state.channelsList,
    usersList: state.usersList,
    currentChannel: state.currentChannel,
    currentUser: state.currentUser
  }
}

function mapDispatchToProps (dispatch: Dispatch) {
  return {
    changeChannel: (newChannelId: string) => (dispatch(changeCurrentChannel(newChannelId))),
    getAllChannels: () => (dispatch(getAllChannels())),
    getAllUsers: () => (dispatch(getAllUsers())),
    createNewChatData: (userId:string, counterUserId: string, signedUserName: string, counterUserName: string) => (dispatch(createUserChatData(userId, counterUserId, signedUserName, counterUserName))),
    createNewChannel: (channel:ChannelData) => (dispatch(createChannel(channel)))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList)