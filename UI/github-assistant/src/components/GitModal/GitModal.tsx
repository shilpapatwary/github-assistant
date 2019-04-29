/* eslint-disable no-unused-expressions */
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

interface GitProps {
  formActionType: string,
  createRepo: any,
  addUser: any,
  reportIssue: any,
  getOpenIssues: any,
  currentChannel: string,
  modalState: boolean,
  toggleModal: any,
  className: string
}

const GitModal = (props: GitProps) => {
  
  const submitFormHandler = (e: any) => {
    e.preventDefault();
      let inputData = {
        repoName: (document.getElementById('repo-name') as HTMLInputElement).value,
        addUserName: document.getElementById('add-user') && (document.getElementById('add-user') as HTMLInputElement).value,
        issueTitle: document.getElementById('issue-title') && (document.getElementById('issue-title') as HTMLInputElement).value,
        issueDesc: document.getElementById('issue-desc') && (document.getElementById('issue-desc') as HTMLInputElement).value,
        repotype: document.querySelector('input[name="repotype"]:checked') && (document.querySelector('input[name="repotype"]:checked') as HTMLInputElement).value
      }

  const isRepoPrivate = inputData.repotype === "true" ? true : false;
   
   props.formActionType === 'createRepo' ? props.createRepo(props.currentChannel, {name: inputData.repoName, private: isRepoPrivate}) : null;
   props.formActionType === 'addUser' ? props.addUser(props.currentChannel, {repo: inputData.repoName, username: inputData.addUserName}) : null;
   props.formActionType === 'reportIssue' ? props.reportIssue(props.currentChannel, {repo:inputData.repoName, issue:{title: inputData.issueTitle, body: inputData.issueDesc}}) : null;
   props.formActionType === 'getOpenIssues' ? props.getOpenIssues(props.currentChannel, inputData.repoName) : null;
  }
  
  const cmdPanelClass = props.formActionType !== 'unknownCmd' ? 'cmdPanelClass' : '';
  return (
    <div className="btnWrapper pull-right">
      <Modal isOpen={props.modalState} toggle={props.toggleModal} className={props.className}>
        <ModalHeader toggle={props.toggleModal}>#GitBot - Need few more details to execute the command</ModalHeader>            
        <ModalBody>
          <form onSubmit={submitFormHandler} className={cmdPanelClass}>
                        
            <div className="form-group">
              <label htmlFor="repo-name" className="control-label">Repository Name:</label>
              <input type="text" className="form-control" id="repo-name" placeholder="Repository name" required />
            </div>
            
            {props.formActionType === 'addUser' ? (<div className="form-group">
              <label htmlFor="add-user" className="control-label">User Name to add as collaborators:</label>
              <input type="text" className="form-control" id="add-user" placeholder="Red John" required />
            </div>) : ''}
            
            {props.formActionType === 'reportIssue' ? (<div className="form-group">
              <label htmlFor="issue-title" className="control-label">Issue Title</label>
              <input type="text" className="form-control" id="issue-title" placeholder="Unable to login.." required />
            </div>) : ''}
            
            {props.formActionType === 'reportIssue' ? (<div className="form-group">
              <label htmlFor="issue-desc" className="control-label">Detailed Description</label>
              <input type="text" className="form-control" id="issue-desc" placeholder="Detailed description of the issue" />
            </div>) : ''}
            
            {props.formActionType === 'createRepo' ? (<div className="form-group">
              <div className="radio">
                <label><input type="radio" name="repotype" value="true" checked />Private repository</label>
              </div>
              <div className="radio">
                <label><input type="radio" name="repotype" value="false"/>Public repository</label>
              </div>
            </div>) : ''}
            
            <ModalFooter>
              <Button color="secondary" onClick={props.toggleModal} className="cancel">Close</Button>
              <Button color="primary" className="submit">Go</Button>
            </ModalFooter>
          </form>
          
          <div className={cmdPanelClass}>
            <p>Supported #gitbot commands are</p>
            <ul className="cmd-desc-ul">
              <li>
                <span className="cmd">#gitbot create repo</span>
                <span className="desc"> - Create Private or Public Repository</span>
              </li>
              <li>
                <span className="cmd">#gitbot add user</span>
                <span className="desc"> - Add github users as collaborators to a repository</span>
              </li>
              <li>
                <span className="cmd">#gitbot report issue</span>
                <span className="desc"> - Create issues in a project</span>
              </li>
              <li>
                <span className="cmd">#gitbot get open issues</span>
                <span className="desc"> - Get List of open issues in a project</span>
              </li>
            </ul>
            <ModalFooter>
              <Button color="secondary" onClick={props.toggleModal} className="cancel">Close</Button>
              <Button color="primary" onClick={props.toggleModal} className="button">Got it</Button>
            </ModalFooter>
          </div>
          
        </ModalBody>
        
      </Modal>
    </div>
  )
}

export default GitModal;
