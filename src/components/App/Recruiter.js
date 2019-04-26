import React, { Component } from 'react';
import './App.css';

import 'semantic-ui-css/semantic.min.css';
import { Button, Header, Segment,  Input, Menu} from 'semantic-ui-react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import PostedJobs from '../PostedJobs/PostedJobs.jsx';
import PostNewJob from '../PostNewJob/PostNewJob.jsx';
import Search from '../Search/Search.jsx';
import Account from '../Account/Account.jsx';
import User from '../User/User.jsx'

class Recruiter extends Component {
  state = { activeItem: 'bio' };
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    return (
      <div className="App">
        <h3 class="ui block header">Resume Search Engine</h3>

        <div>
          <Router>
            <Button.Group>
              <Button class="MainMenuOptions" size='large'><Link to={"/recruiter"}>Posted Jobs</Link></Button>
              <Button class="MainMenuOptions"><Link to={"/addnewjob"}>Post New Jobs</Link></Button>
              <Button class="MainMenuOptions"><Link to={"/search"}>Search</Link></Button>
              <Button class="MainMenuOptions"><Link to={"/account"}>My Account</Link></Button>
            </Button.Group>

            <Switch>
              <Route exact path={"/recruiter"} component={PostedJobs} />
              <Route exact path={"/addnewjob"} component={PostNewJob} />
              <Route exact path={"/search"} component={Search} />
              <Route exact path={"/account"} component={Account} />

            </Switch>
          </Router>
        </div>

      </div>
    );
  }
}

export default Recruiter;
