// Logo and Nav links at page top

import React from 'react';
import Login from '../Login';
import logo from '../../assets/images/bot.png';
import { connect } from 'react-redux';
import cookie from 'js-cookie';
import {Dispatch} from 'redux';
import { SlackApplicationState, LoggedInUserData } from '../../redux/types';
import {getLoginInfo, setLoggedInStatus, setLogOutStatus} from '../../redux/actions';

interface Props {
	getLoginUrl: any,
	setLoggedInStatus: any,
	setLogOut: any
	loginUrl: string,
	isLoggedIn: boolean,
	currentUser?: LoggedInUserData
}
class HeaderNavigation extends React.Component<Props>{
	constructor(props: Props){
	super(props);
	this.setLogOut = this.setLogOut.bind(this);
  }
  setLogOut() {
	cookie.remove('userid');
	cookie.remove('username');
	cookie.remove('token');
	this.props.setLogOut();
  }
	render() {
		return <nav className="navbar navbar-default navbar-fixed-top">
		<div className="container-fluid">
		<div className="navbar-header">
			<h1 title="Slack Application GITBot"><img className="navbar__logo" src={logo} alt="Slack Application GITBot"></img><a className="navbar-brand" href="/">GitHub Assistant</a></h1>
		</div>
			<div id="navbar" className="navbar-collapse collapse">
				<ul className="nav navbar-nav navbar-right">
					<li><Login getLoginUrl={this.props.getLoginUrl} loginUrl={this.props.loginUrl} setLoggedInStatus={this.props.setLoggedInStatus} isLoggedIn={this.props.isLoggedIn} user={this.props.currentUser}></Login></li>
					{this.props.isLoggedIn && <li onClick={this.setLogOut}><a href="javascript:void(0)">Logout</a></li>}
				</ul>
			</div>
		</div> 
	</nav>
	}
}

function mapStateToProps(state: SlackApplicationState) {
  return {
		isLoggedIn: state.isLoggedIn || false,
		loginUrl: state.loginUrl || "",
		currentUser: state.currentUser
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
		getLoginUrl: () => {dispatch(getLoginInfo())},
		setLoggedInStatus: (user: LoggedInUserData) => {dispatch(setLoggedInStatus(user))},
		setLogOut:() => {dispatch(setLogOutStatus())}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderNavigation);
