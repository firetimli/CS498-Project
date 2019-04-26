import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import {withRouter} from 'react-router';
import axios from 'axios';
import _ from 'lodash';
import PropTypes from 'prop-types';
import './styles/LoginAndSignup.css';

import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';


class Login extends Component {

  state =  {
    base_api_url: 'http://localhost:5000/api/',
    username: 'uofiszhou42',
    password: 'zhixing1996',
    message: ''
  }

  componentDidMount() {

  }

  componentWillMount() {
    axios.defaults.withCredentials = true;
    axios.get('http://localhost:5000/api/is_authenticated', {withCredentials: true})
      .then(function (response) {
        console.log(response);
        if(response.data.is_authenticated == "true") {
          console.log("Already loggedin");
          if(response.data.userObj.userType == 'recruiter') {
            window.location.href = "http://localhost:3000/recruiter";
          }
          else {
            window.location.href = "http://localhost:3000/jobseeker";
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
<<<<<<< HEAD
    var obj = this;
    console.log(username);
    console.log(password);

    axios.post(`${this.state.base_api_url}login`, {
      username: username,
      password: password
    })
    .then(function (response) {
      // Server redirect cannot be done because we're using different server for frontend and backend
      window.location.href = "http://localhost:3000/recruiter";
      console.log("--------------");
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
      obj.setState({message : 'Username or password is incorrect'})
    });
=======

    //axios.defaults.withCredentials = true;
    axios.post('http://localhost:5000/api/login', {username:username, password:password})
      .then(function (response) {
        //window.location.href = "http://localhost:3000/";
        console.log(response);

        if(response.data.userObj.userType == 'recruiter') {
          window.location.href = "http://localhost:3000/recruiter";
        }
        else {
          window.location.href = "http://localhost:3000/jobseeker";
        }
      })
      .catch(function (error) {
          console.log(error);
      });
>>>>>>> 0e0a106c7fb7f09874b9514df9a457222bb1c2a4
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

  // signupOnClick = (event) => {
  //   window.location.href = "http://localhost:3000/signup";
  // }

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
