import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import {Dispatch} from 'redux'
import { sendMessage, gitCreateRepoAction, gitAddUserAction, gitReportIssueAction, gitGetOpenIssues } from '../../redux/actions';
import GitModal from '../GitModal/GitModal';
import {RepoData, IssueData} from '../../redux/types';

interface MessageProps{
  createRepo: any,
  toggleModal: any,
  addUser: any,
  reportIssue: any,
  getOpenIssues: any,
  openModal: any,
  submitMessage: any,
  currentChannel: string,
  modalState: boolean,
  currentUser: any
}

interface MessageState{
  inContextFormAction: string
}

class NewMessageWrapper extends React.Component<MessageProps, MessageState> {
  gitBotPattern: string;
  constructor(props: MessageProps) {
    super(props);
    this.gitBotPattern = '#gitbot';
    this.newMessageFormHandler = this.newMessageFormHandler.bind(this);
    this.createRepo = this.createRepo.bind(this);
    this.addUser = this.addUser.bind(this);
    this.reportIssue = this.reportIssue.bind(this);
    this.getOpenIssues = this.getOpenIssues.bind(this);
    this.state = {
      inContextFormAction: ''
    }
  }
  
  newMessageFormHandler(e: any){
    e.preventDefault();
    this.gitCmdOrPostMsgCheck(e.target.elements[0].value.trim());    
    e.target.reset();
  }
  
  createRepo(channelId: string, repoData: RepoData) {
    this.props.toggleModal();
    this.props.createRepo(channelId, repoData);
  }

  addUser(channelId: string, gitData: any) {
    this.props.toggleModal();
    this.props.addUser(channelId, gitData);
  }

  reportIssue(channelId: string, issueData: IssueData) {
    this.props.toggleModal();
    this.props.reportIssue(channelId, issueData);
  }

  getOpenIssues(channelId: string, repo: any) {
    this.props.toggleModal();
    this.props.getOpenIssues(channelId, repo);
  }
  
  gitCmdOrPostMsgCheck(msgvalue: string){
    let pattern = new RegExp(`\\${this.gitBotPattern}\\b`, 'gi');
    if(pattern.test(msgvalue)){
      const positionToFindCmd = msgvalue.search(pattern) + this.gitBotPattern.length + 1;
      const gitAction = msgvalue.substr(positionToFindCmd) && msgvalue.substr(positionToFindCmd).toLowerCase();
      switch(gitAction){
        case "create repo":
          this.setState({inContextFormAction: 'createRepo'});
          break;
        case "add user":
          this.setState({inContextFormAction: 'addUser'});
          break;
        case "report issue":
          this.setState({inContextFormAction: 'reportIssue'});
          break;
        case "get open issues":
          this.setState({inContextFormAction: 'getOpenIssues'});
          break;
        default:
        this.setState({inContextFormAction: 'unknownCmd'});
      }
      this.props.openModal();
    } else {
      this.props.submitMessage(this.props.currentChannel, msgvalue, this.props.currentUser.id);      
    }
  }
  
  render(){
    let activeToggle = this.props.currentChannel ? '' : 'disabled';
    let modalViewUI = <GitModal 
        className="create-modal" 
        modalState={this.props.modalState}
        currentChannel={this.props.currentChannel}
        toggleModal={this.props.toggleModal} 
        formActionType = {this.state.inContextFormAction}
        createRepo={this.createRepo}
        addUser={this.addUser}
        reportIssue={this.reportIssue}
        getOpenIssues={this.getOpenIssues} ></GitModal>;
    return (
      <>
      <div className="new-message-wrapper" onSubmit={this.newMessageFormHandler}>
  			<form className={activeToggle}>
          <input className="new-message-input" placeholder="Your message" type="text" id="new-message-input" required />
          <label htmlFor="new-message-input" className="hidden">New Message</label>
          <input className="submit-new-message btn btn-primary" aria-label="Send new message" type="submit" value="SEND" />
    		</form>
  		</div>
      <Button className="hide modelTrigger" color="success">Add</Button>
      {modalViewUI}
      </>
    )
  }
  
}


function mapStateToProps(state: any) {
  return {
    currentChannel: state.currentChannel,
    currentUser: state.currentUser
  }
}

function mapDispatchToProps (dispatch: Dispatch) { 
  return {
    submitMessage: (channelId: string, newMessageValue: string, currentUser: string) => (dispatch(sendMessage(channelId, newMessageValue, currentUser))),
    createRepo: (channelId: string, repoData: RepoData) => (dispatch(gitCreateRepoAction(channelId, repoData))),
    addUser: (channelId: string, gitData: any) => (dispatch(gitAddUserAction(channelId, gitData))),
    reportIssue: (channelId: string, issueData: IssueData) => (dispatch(gitReportIssueAction(channelId, issueData))),
    getOpenIssues: (channelId: string, repo: any) => (dispatch(gitGetOpenIssues(channelId, repo)))
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMessageWrapper);