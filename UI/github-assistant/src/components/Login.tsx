import React, { Component } from 'react';
import Cookies from 'js-cookie';
import {LoggedInUserData} from '../redux/types';
import {Link} from 'react-router-dom';

interface loginProps{
    getLoginUrl: any,
    setLoggedInStatus: any
    loginUrl: string,
    isLoggedIn: boolean,
    user?: LoggedInUserData
}

interface userState{
    isLoggedin: boolean
}

class Login extends Component<loginProps, userState> {
 constructor(props: loginProps) {
     super(props);
     this.state={
         isLoggedin: false
     }
 }
 componentDidMount() {
    const isLoggedin = Cookies.get('username') ? true : false;
    this.setState({isLoggedin: isLoggedin}, () => {
        !this.state.isLoggedin ? this.props.getLoginUrl() : this.props.setLoggedInStatus({
        name: Cookies.get('username'), 
        id: Cookies.get('userid')
        }) ;
    });
 }

render() {
    return (
      <React.Fragment>
        {!this.props.isLoggedIn && <a href={this.props.loginUrl} id="login">Github Login</a>}
        {this.props.isLoggedIn && this.props.user && <Link to={'/user'}><span className="fa fa-user userIcon"></span>Welcome, <span className="user__name">{this.props.user.name}</span></Link>}
      </React.Fragment>
     
    );
  }
}

export default Login;
