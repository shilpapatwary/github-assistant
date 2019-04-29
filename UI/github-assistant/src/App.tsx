import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import { Switch, Route, BrowserRouter } from 'react-router-dom'

import SlackApp from './containers/SlackApp';
import User from './components/UserComponent/User';

import './App.css';

class App extends React.Component {
  render() {
    return <Provider store={store}>
            <BrowserRouter>
              <Switch>
                <Route exact path="/" component={SlackApp}/>
                <Route path="/user" component={User}/>
              </Switch>
            </BrowserRouter>
           </Provider>
  }
}

export default App;