import React, { Component } from 'react';
import './App.css';

import 'semantic-ui-css/semantic.min.css';
import { Button, Header, Segment,  Input, Menu} from 'semantic-ui-react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import Login from './login.js';
import Signup from './signup.js';

class LoginAndSignUp extends Component {
  state = { activeItem: 'bio' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    return (
      <div className="App">
        <h3 class="ui block header">Resume Search Engine</h3>

        <div>
            <Router>
              <Button.Group>
                <Button class="MainMenuOptions" size='large'><Link to={"/login"}>Log In</Link></Button>
                <Button class="MainMenuOptions"><Link to={"/signup"}>Sign Up</Link></Button>
              </Button.Group>

              <Switch>
                <Route exact path={"/login"} component={Login} />
                <Route exact path={"/signup"} component={Signup} />
              </Switch>
            </Router>
        </div>

      </div>
    );
  }
}

export default LoginAndSignUp;
