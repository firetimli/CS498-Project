import React, { Component } from 'react';
import './App.css';

import 'semantic-ui-css/semantic.min.css';
import { Button, Header, Segment,  Input, Menu} from 'semantic-ui-react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import PostedJobs from '../PostedJobs/PostedJobs.jsx';
import PostNewJob from '../PostNewJob/PostNewJob.jsx';
import Search from '../Search/Search.jsx';
import Account from '../Account/Account.jsx';
import User from '../User/User.jsx';

import LoginAndSignUp from './MainPage.js';
import Login from './login.js';
import Signup from './signup.js';
import Recruiter from './Recruiter.js';


class App extends Component {
  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div>
          
          <Switch>
            <Route exact path={"/login"} component={LoginAndSignUp} />
            <Route exact path={"/signup"} component={Signup} />
            <Route path="/recruiter" component={ Recruiter } />
            <Route path={"/jobseeker"} component={User} />
          </Switch>
        </div>
      </Router>     
    );
  }

}

export default App;
