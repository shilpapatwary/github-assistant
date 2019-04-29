import React from 'react';
import { connect } from 'react-redux';
import logo from '../../assets/images/bot.png';
import { SlackApplicationState } from '../../redux/types';

interface Userprops{
  usersList: any,
  currentUser: any
}

const User = (props: Userprops) => {
  const user = props.usersList.filter((l: any) => l.userId === props.currentUser.id)[0];
  return (
    <React.Fragment> 
    <nav className="navbar navbar-default navbar-fixed-top">
      <div className="container-fluid">
      <div className="navbar-header">
      <h1 title="Slack Application GITBot"><img className="navbar__logo" src={logo} alt="Slack Application GITBot"></img><a className="navbar-brand" href="/">GitHub Assistant</a></h1>
      </div>
      </div> 
	  </nav>
    <main className="container-fluid">
      <div className="userinfo">
        <h2>User Information</h2>
        <ul className="userInfo__list">
          <li className="userinfo__avatar"><img src={user.avatar} alt="User Avatar"></img></li>
          <li className="userInfo__name">User: {user.username}</li>
        </ul>
      </div>
    </main>
  </React.Fragment>
   
  )
}
function mapStateToProps(state: SlackApplicationState) {
  return {
    usersList: state.usersList,
    currentUser: state.currentUser
  }
}
export default connect(mapStateToProps, null)(User);