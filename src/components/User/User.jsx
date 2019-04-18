import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, Menu} from 'semantic-ui-react'
import "./User.css"

class User extends Component {
  state = {
      ids:["Account","Upload","Password","Stats","LogOut"],
      cards:["_Account","_Upload","_Password","_Stats","_LogOut"],
    };

  onClick = (id) =>{
      var elem1 = document.getElementById(this.state.ids[0]);
      var elem2 = document.getElementById(this.state.ids[1]);
      var elem3 = document.getElementById(this.state.ids[2]);
      var elem4 = document.getElementById(this.state.ids[3]);
      var elem5 = document.getElementById(this.state.ids[4]);
      elem1.classList.remove("active");
      elem2.classList.remove("active");
      elem3.classList.remove("active");
      elem4.classList.remove("active");
      elem5.classList.remove("active");
      var elem6 = document.getElementById(id);
      elem6.classList.add("active");

      var card1 = document.getElementById(this.state.cards[0]);
      var card2 = document.getElementById(this.state.cards[1]);
      var card3 = document.getElementById(this.state.cards[2]);
      var card4 = document.getElementById(this.state.cards[3]);
      var card5 = document.getElementById(this.state.cards[4]);
      card1.style.display = "none";
      card2.style.display = "none";
      card3.style.display = "none";
      card4.style.display = "none";
      card5.style.display = "none";
      var card_id = "_" + id;
      var card6 = document.getElementById(card_id);
      card6.style.display = "block";
    };

  render(){

        return (
          <div className="ui grid">
            <div className="two wide column account_container">
            </div>
            <div className="four wide column account_container">
              <div className="ui vertical fluid tabular menu">
                <a className="active item" id = "Account" onClick = {this.onClick.bind(this,"Account")}>
                  Account
                </a>
                <a className="item" id = "Upload" onClick = {this.onClick.bind(this,"Upload")}>
                  Upload Resumes
                </a>
                <a className="item" id = "Password" onClick = {this.onClick.bind(this,"Password")}>
                  Change Password
                </a>
                <a className="item" id = "Stats" onClick = {this.onClick.bind(this,"Stats")}>
                  Stats
                </a>
                <a className="item" id = "LogOut" onClick = {this.onClick.bind(this,"LogOut")}>
                  LogOut
                </a>
            </div>
            </div>

            <div className="eight wide column account_container">
              <div className="ui segment _Account" id="_Account">
                <div className = "account_row">
                  <h4>Name: {this.state.Name}</h4>
                </div>
                <div className = "account_row">
                  <h4>Email: {this.state.Email}</h4>
                </div>
              </div>

              <div className="ui segment _Upload" id="_Upload">
                <input name="userfile" type="file" accept="application/pdf, application/vnd.ms-excel" />
              </div>

              <div className="ui segment _Password" id="_Password">
              <div className = "account_row">
                <p>Current Password:</p><input placeholder="Input..." className="password_input"></input>
              </div>
              <div className = "account_row">
                <p>New Password:</p><input placeholder="Input..." className="password_input"></input>
              </div>
              <div className = "account_row">
                <p>Re-enter Password:</p><input placeholder="Input..." className="password_input"></input>
              </div>
              <div className = "password_btn">
                <button className="ui basic button">Update</button>
              </div>
              </div>

              <div className="ui segment _Stats" id="_Stats">
                Stats
              </div>

              <div className="_LogOut" id="_LogOut">
                <div className = "logout_btn">
                  <button className="ui basic blue button">LogOut</button>
                </div>
              </div>
            </div>

            <div className="two wide column account_container">
            </div>
        </div>

        )
    }

}

export default User
