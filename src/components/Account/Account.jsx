import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, Menu} from 'semantic-ui-react'
import "./Account.css"

class Account extends Component {
  state = {
    ids:["Account","Password","LogOut"],
    cards:["_Account","_Password","_LogOut"],
    Name : "Tim",
    Email : "boyuli3@illinois.edu",
    Company : '',
    Industry : '',
    Location : '',
    Type: '',
    Size : '',
    OldPassword:'',
    NewPassword : '',
    ReTypePassword : ''
  }


  onClick = (id) =>{
    var elem1 = document.getElementById(this.state.ids[0]);
    var elem2 = document.getElementById(this.state.ids[1]);
    var elem3 = document.getElementById(this.state.ids[2]);
    elem1.classList.remove("active");
    elem2.classList.remove("active");
    elem3.classList.remove("active");
    var elem5 = document.getElementById(id);
    elem5.classList.add("active");

    var card1 = document.getElementById(this.state.cards[0]);
    var card2 = document.getElementById(this.state.cards[1]);
    var card3 = document.getElementById(this.state.cards[2]);
    card1.style.display = "none";
    card2.style.display = "none";
    card3.style.display = "none";
    var card_id = "_" + id;
    var card5 = document.getElementById(card_id);
    card5.style.display = "block";

  }

  InputOnChange = (e) => {
    console.log(e.target.id)
    if(e.target.id == "Company"){
      this.setState({Company:e.target.value})
    }
    if(e.target.id == "Industry"){
      this.setState({Industry:e.target.value})
    }
    if(e.target.id == "Location"){
      this.setState({Location:e.target.value})
    }
    if(e.target.id == "Type"){
      this.setState({Type:e.target.value})
    }
    if(e.target.id == "Size"){
      this.setState({Size:e.target.value})
    }
    if(e.target.id == "Old"){
      this.setState({OldPassword:e.target.value})
    }
    if(e.target.id == "New"){
      this.setState({NewPassword:e.target.value})
    }
    if(e.target.id == "ReType"){
      this.setState({ReTypePassword:e.target.value})
    }

  }

  UpdateInfo = (e) => {
    console.log(this.state.Company)
  }

  UpdatePassword = (e) => {
    if(this.state.OldPassword === this.state.NewPassword){
      alert("Old password and new password cannot be the same")
    }
    if(this.state.NewPassword !== this.state.ReTypePassword){
      alert("Re-enter password wrong")
    }
  }

  render() {

	    return (
        <div className="ui grid">
          <div className="two wide column account_container">
          </div>
          <div className="four wide column account_container">
            <div className="ui vertical fluid tabular menu">
              <a className="active item" id = "Account" onClick = {this.onClick.bind(this,"Account")}>
                Account
              </a>
              <a className="item" id = "Password" onClick = {this.onClick.bind(this,"Password")}>
                Password
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
            <div className = "account_row">
              <h4>Company:</h4><input placeholder="input..." className="account_input" id="Company" onChange = {this.InputOnChange.bind(this)}></input>
            </div>
            <div className = "account_row">
              <h4>Industry:</h4><input placeholder="input..." className="account_input" id="Industry" onChange = {this.InputOnChange.bind(this)}></input>
            </div>
            <div className = "account_row">
              <h4>Location:</h4><input placeholder="input..." className="account_input" id="Location" onChange = {this.InputOnChange.bind(this)}></input>
            </div>
            <div className = "account_row">
              <h4>Type:</h4><input placeholder="input..." className="account_input" id="Type" onChange = {this.InputOnChange.bind(this)}></input>
            </div>
            <div className = "account_row">
              <h4>Size:</h4><input placeholder="input..." className="account_input" id="Size" onChange = {this.InputOnChange.bind(this)}></input>
            </div>
            <div className = "account_btn">
              <button className="ui basic button" onClick = {this.UpdateInfo}>Update</button>
            </div>
            </div>

            <div className="ui segment _Password" id="_Password">
            <div className = "account_row">
              <p>Current Password:</p><input placeholder="Input..." className="password_input" id="Old" onChange = {this.InputOnChange.bind(this)}></input>
            </div>
            <div className = "account_row">
              <p>New Password:</p><input placeholder="Input..." className="password_input" id="New" onChange = {this.InputOnChange.bind(this)}></input>
            </div>
            <div className = "account_row">
              <p>Re-enter Password:</p><input placeholder="Input..." className="password_input" id="ReType" onChange = {this.InputOnChange.bind(this)}></input>
            </div>
            <div className = "password_btn">
              <button className="ui basic button" onClick = {this.UpdatePassword}>Update</button>
            </div>
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

export default Account
