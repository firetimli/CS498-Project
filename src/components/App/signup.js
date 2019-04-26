import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import {withRouter} from 'react-router';
import axios from 'axios';
import _ from 'lodash';
import PropTypes from 'prop-types';
import './styles/signup.scss';
import './styles/LoginAndSignup.css';


class Signup extends Component {

  state =  {
    base_api_url: 'http://localhost:5000/api/',
    username: '',
    password: '',
    password2: '',
    email: '',
    message: '',
    userType: ''
  }

  componentDidMount() {

  }

  usernameOnChange = (event) => {
    console.log(event.target.value);
    this.setState({username : event.target.value})
  }

  passwordOnChange = (event) => {
    console.log(event.target.value);
    this.setState({password : event.target.value})
  }

  password2OnChange = (event) => {
    console.log(event.target.value);
    this.setState({password2 : event.target.value});
  }

  emailOnChange = (event) => {
    console.log(event.target.value);
    this.setState({email : event.target.value});
  }

  userTypeOnChange = (event) => {
    console.log(event.target.value);
    this.setState({userType : event.target.value});
  }

  signup = (username, password, password2, email, userType) => {
    var obj = this;
    axios.post(`${this.state.base_api_url}register`, {
      username: username,
      password: password,
      password2: password2,
      email: email,
      userType: userType
    })
    .then(function (response) {
      // Server redirect cannot be done because we're using different server for frontend and backend
      //window.location.href = "http://localhost:3000/dashboard";
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
      obj.setState({message : 'Invalid signup info, try again'});
    });
  }

  signupOnClick = (event) => {
      console.log('Signing up...');
      this.setState({message : ''})
      this.signup(this.state.username, this.state.password, this.state.password2, this.state.email, this.state.userType);
  }

  // backOnClick = (event) => {
  //   window.location.href = "http://localhost:3000/login";
  // }

  render() {
    return (
      <div className="signupPage">

        <div className="signupBox">
          <form spellCheck="false">
            <div className="signupContainer">
              <div className = "Item">
                <div className="ui labeled input Inputs">
                  <div className="ui basic label">
                    Enter Username
                  </div>
                  <input type="text" id="signupUsername" placeholder="Username" value={this.state.username} onChange={this.usernameOnChange}></input>
                </div>
              </div>

              <div className = "Item">
                <div className="ui labeled input Inputs">
                  <div className="ui basic label">
                    Enter Password
                  </div>
                  <input type="text" id="signupPassword" placeholder="Password" value={this.state.password} onChange={this.passwordOnChange}></input>
                </div>
              </div>

              <div className = "Item">
                <div className="ui labeled input Inputs">
                  <div className="ui basic label">
                    Re-Enter Password
                  </div>
                  <input type="text" id="signupPassword2" placeholder="Repeat Password" value={this.state.password2} onChange={this.password2OnChange}></input>
                </div>
              </div>

              <div className = "Item">
                <div className="ui labeled input Inputs">
                  <div className="ui basic label">
                    Enter Email
                  </div>
                  <input type="text" id="signupEmail" placeholder="Email" value={this.state.email} onChange={this.emailOnChange}></input>
                </div>
              </div>


              <div class="ui form">
                <div class="inline fields">
                  <label>Choose User Type</label>
                    <div onChange={this.userTypeOnChange}>
                      <input type="radio" value="recruiter" id="signUpAsRecruiter" name="type" /> Recruiter
                      <input type="radio" value="jobseeker" id="signUpAsJobseeker" name="type" /> Job Seeker
                    </div>
                </div>
              </div>

              <Button id="signupnow" variant="success" onClick={this.signupOnClick}>Signup</Button>
            </div>
          </form>
          <span id="signupmessage"> {this.state.message}</span>
        </div>
      </div>
    );
  }
}
//export default Login;
export default withRouter(Signup);
