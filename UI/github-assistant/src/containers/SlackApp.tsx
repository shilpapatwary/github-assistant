import * as React from 'react'
import { connect } from 'react-redux';
import {Dispatch} from 'redux';
import { SlackApplicationState, LoggedInUserData } from '../redux/types';
import {editMessage, deleteMessage} from '../redux/actions';

import HeaderNavigation from '../components/HeaderNavigation/HeaderNavigation';
import NewChannel from '../components/NewChannel/NewChannel';
import ChannelList from '../components/ChannelList/ChannelList';
import ChannelMessages from '../components/ChannelMessageWrapper/ChannelMessageWrapper';
import NewMessages from '../components/NewMessageWrapper/NewMessageWrapper';
import './SlackApp.css';
import { channel } from 'redux-saga';

interface Props {
  channelList: any,
  usersList: any,
  currentChannel: any,
  isLoggedIn: any,
  currentUser: any,
  editMessage: any,
  deleteMessage: any
}

interface States {
  modalState: boolean
}

class SlackApp extends React.Component<Props, States> {
  constructor(props: Props){
    super(props);
    this.openModal = this.openModal.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.state = {
      modalState: false
    }
  }
  
  openModal(){
    this.setState({
      modalState: true
    });
  }
  
  toggleModal(){
    this.setState({
      modalState: !this.state.modalState
    });
  }  
  
  getChannelFromData(inContextChannel: string){
    return this.props.channelList.filter((channel: any) => channel.channelId === inContextChannel)[0];
  }
 
  render(){
    let currentChannelPresent = this.props.currentChannel ? '' : (<div className={"no-channel "}>
      <p>Start by selecting the channel list from left section</p>
    </div>);
    let isLoggedInClass = this.props.isLoggedIn ? 'container-fluid section-wrapper' : 'container-fluid section-wrapper disabled';
    return <React.Fragment>
      <HeaderNavigation />
      <main className="container-fluid">
      <div className={isLoggedInClass}>	    	
          <div className="col-sm-3 col-lg-2 left-section">
            <NewChannel />
            {this.props.isLoggedIn && <ChannelList />}
          </div>
          
          <div className="col-sm-9 col-lg-10 centre-section">
            {currentChannelPresent}
            <ChannelMessages inContextChannelDetails={this.getChannelFromData(this.props.currentChannel)} usersList={this.props.usersList} currentUser={this.props.currentUser} editMessage={this.props.editMessage} deleteMessage = {this.props.deleteMessage}/>
            <NewMessages 
              modalState={this.state.modalState} 
              openModal={this.openModal} 
              toggleModal={this.toggleModal} />
          </div>
          
          <div className="col-sm-12 section-overlay">
            <p>Please login through your github account to get started!</p>
          </div>
              
        </div>
      </main>
        
    </React.Fragment>
    
  }
}

function mapStateToProps(state: SlackApplicationState) {
  return {
    channelList: state.channelsList,
    usersList: state.usersList,
    currentChannel: state.currentChannel,
    isLoggedIn: state.isLoggedIn || false,
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
		editMessage: (channelId: string, messageId: string, messageValue: string) => {dispatch(editMessage(channelId, messageId, messageValue))},
    deleteMessage: (channelId: string, messageId: string) => {dispatch(deleteMessage(channelId, messageId))}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(SlackApp);