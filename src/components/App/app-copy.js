import React, { Component } from 'react';
import './App.css';

import { Button, Header, Segment,  Input, Menu, Menu} from 'semantic-ui-react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import PostedJobs from '../PostedJobs/PostedJobs.jsx';
import PostNewJob from '../PostNewJob/PostNewJob.jsx';
import Search from '../Search/Search.jsx';
import Account from '../Account/Account.jsx';

class App extends Component {
  state = { activeItem: 'bio' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    return (
      <div className="App">
        <h3 class="ui block header">Resume Search Engine</h3>

        <div>
          <Router>
            <Menu>
              <Menu.Item>
                <Link to={"/"}>Posted Jobs</Link>
              </Menu.Item>

              <Menu.Item name='reviews'>
                <Link to={"/search"}>Search</Link>
              </Menu.Item>

              <Menu.Item>
                Upcoming Events
              </Menu.Item>
            </Menu>

            <Switch>
                <Route exact path={"/"} component={PostedJobs} />
                <Route exact path={"/addnewjob"} component={PostNewJob} />
                <Route exact path={"/search"} component={Search} />
                <Route exact path={"/account"} component={Account} />
            </Switch>
          </Router>
        </div>

        <div>
          <Router>
            <Button.Group>
              <Button class="MainMenuOptions" size='large'  color='red'><Link to={"/"}>Posted Jobs</Link></Button>
              <Button class="MainMenuOptions"><Link to={"/addnewjob"}>Post New Jobs</Link></Button>
              <Button class="MainMenuOptions"><Link to={"/search"}>Search</Link></Button>
              <Button class="MainMenuOptions"><Link to={"/account"}>My Account</Link></Button>
            </Button.Group>

            <Switch>
              <Route exact path={"/"} component={PostedJobs} />
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

export default App;
