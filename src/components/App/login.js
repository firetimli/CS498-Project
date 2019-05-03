import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import {withRouter} from 'react-router';
import axios from 'axios';
import _ from 'lodash';
import PropTypes from 'prop-types';
import './styles/LoginAndSignup.css';
import { BASE_URL, BASE_URL_REACT} from '../../utils/prod';

import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';


class Login extends Component {

  state =  {
    username: 'uofiszhou42',
    password: 'zhixing1996',
    message: ''
  }

  componentDidMount() {

  }

  componentWillMount() {
    axios.defaults.withCredentials = true;
    axios.get(`${BASE_URL}is_authenticated`, {withCredentials: true})
      .then(function (response) {
        console.log(response);
        if(response.data.is_authenticated == "true") {
          console.log("Already loggedin");
          if(response.data.userObj.userType == 'recruiter') {
            window.location.href = `${BASE_URL_REACT}recruiter`;
          }
          else {
            window.location.href = `${BASE_URL_REACT}jobseeker`;
          }
        }
        else {
          console.log("Not loggedin");
        }
      })
      .catch(function (error) {

      });
  }

  login = (username, password) => {

    //axios.defaults.withCredentials = true;
    axios.post(`${BASE_URL}login`, {username:username, password:password})
      .then(function (response) {
        console.log(response);

        if(response.data.userType == 'recruiter') {
            window.location.href = `${BASE_URL_REACT}recruiter`;
        }
        else {
          window.location.href = `${BASE_URL_REACT}jobseeker`;
        }
      })
      .catch(function (error) {
          console.log('login err')
          console.log(error);
      });

  }

  usernameOnChange = (event) => {
    console.log(event.target.value);
    this.setState({username : event.target.value})
  }

  passwordOnChange = (event) => {
    console.log(event.target.value);
    this.setState({password : event.target.value})
  }

  loginOnClick = (event) => {
      console.log('Logging in...');
      this.setState({message : ''})
      this.login(this.state.username, this.state.password);
  }

  render() {
    return (
      <div className="loginPage">
        <div className="loginBox">
          <form spellCheck="false">
            <div className="container">
              <div className = "Item">
                <div className="ui labeled input Inputs">
                  <div className="ui basic label">
                    Username
                  </div>
                  <input type="text" id="username" placeholder="Username" value={this.state.username} onChange={this.usernameOnChange}></input>
                </div>
              </div>

              <div className = "Item">
                <div className="ui labeled input Inputs">
                  <div className="ui basic label">
                    Password
                  </div>
                  <input type="text" id="password" placeholder="Password" value={this.state.password} onChange={this.passwordOnChange}></input>
                </div>
              </div>

              <Button id="login" className="custom-btn" onClick={this.loginOnClick}>Login</Button>
            </div>
          </form>
          <span id="message"> {this.state.message}</span>
        </div>
      </div>
    );
  }
}
//export default Login;
export default withRouter(Login);
