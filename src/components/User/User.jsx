import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, Menu} from 'semantic-ui-react'
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import "./User.css"
import axios from 'axios';
import { BASE_URL, BASE_URL_REACT} from '../../utils/prod';


class User extends Component {
  state = {
      name : '',
      email : '',
      ids:["Account","Upload","Password","Stats","LogOut"],
      cards:["_Account","_Upload","_Password","_Stats","_LogOut"],
      recruiters:[{id : '1', Company : 'Apple', Industry : 'Mobile', Location : 'SF', Type: 'Tech', Size : '10000'},
                  {id : '2', Company : 'Google', Industry : 'Internet', Location : 'SF', Type: 'Tech', Size : '10000'},
                  {id : '3', Company : 'Facebook', Industry : 'Internet', Location : 'SF', Type: 'Tech', Size : '10000'},
                  {id : '4', Company : 'Amazon', Industry : 'Internet', Location : 'Sealtle', Type: 'Tech', Size : '10000'}],
      stars : [1,2,3,4,5,6,5],
      Industry:[{}],
      OldPassword:'',
      NewPassword : '',
      ReTypePassword : '',
      userid: '',
      pdf : ''
    };

  componentWillMount() {
      axios.defaults.withCredentials = true;
      var obj = this;
      axios.get(`${BASE_URL}user`, {withCredentials: true})
        .then(function (response) {
          console.log('user profile');
          console.log(response);
          obj.setState(
          {
              name:response.data.ret.username,
              email:response.data.ret.email
          });
          console.log(obj.state);

          console.log(response.data.ret._id);
          axios.post(`${BASE_URL}getRecentStarredNumber`, {id: response.data.ret._id})
          .then((response) => {
            // console.log(response.data);
            obj.setState({"starredNumber": response.data.starredUsers.length});
            var starredRecruiters = response.data.starredUsers;
            var industries = {};
            for(var i = 0; i < starredRecruiters.length; i++){
              console.log(starredRecruiters[i].industry);
              if(industries[starredRecruiters[i].industry] == undefined){
                industries[starredRecruiters[i].industry]= 1.0;
              }
              else{
                industries[starredRecruiters[i].industry] += 1.0;
              }
            }
            console.log(industries);
            var numberOfIndustries = 0.0;
            for(var indu in industries){
              numberOfIndustries += industries[indu];
            }
            console.log(numberOfIndustries);

            for(var indu in industries){
              industries[indu] /= numberOfIndustries;
            }
            console.log(industries);

            var industriesData = [];
            var firstPiece = true;
            for(var indu in industries){
              if(firstPiece == true){
                industriesData.push({name: indu, y: industries[indu], sliced: true, selected: true});
                firstPiece = false;
              }else{
                industriesData.push({name: indu, y: industries[indu]});
              }
            }
            console.log(industriesData);
            // console.log(typeof(industriesData));

            obj.setState({"starredIndustries": industriesData});


          }).catch((error) => {
            console.log(error);
          });
        })
        .catch(function (error) {
          console.log('user profile err');
          console.log(error);
        });


    }

  logoutOnClick = (event) => {
      axios.get(`${BASE_URL}logout`, {withCredentials: true})
        .then(function (response) {
          console.log(response);
          window.location.href = `${BASE_URL_REACT}login`;
        })
        .catch(function (error) {
          console.log(error);
        });
    }

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

  InputOnChange = (e) => {
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
  UpdatePassword = (e) => {
    if(this.state.OldPassword === this.state.NewPassword){
      alert("Old password and new password cannot be the same");
      return;
    }
    if(this.state.NewPassword !== this.state.ReTypePassword){
      alert("Re-enter password wrong");
      return;
    }

    axios.post(`${BASE_URL}change_password`, {
      oldpassword: this.state.OldPassword,
      newpassword: this.state.NewPassword,
    }, {withCredentials: true})
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {

      });
  }

 handleSubmit = (e) => {
   e.preventDefault();
   const dataForm = new FormData();
   dataForm.append('userfile', e.target.files[0]);
   dataForm.append('fileName',e.target.files[0].name);

   axios.post(`${BASE_URL}resume`, dataForm)
     .then(res => {

     })
     .catch(err => console.log(err));
 }

  render(){
      const StarOptions = {
        title: {
          text: 'Starred Numbers in Past 7 Days'
        },
        yAxis: {
          title: {
              text: 'Number of Stars'
            }
          },
        xAxis: {
            title: {text: 'Days'}
          },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
          },
        plotOptions: {
          series: {
              label: {
                  connectorAllowed: false
                },
                pointStart: 1
              }
          },
        series: [
          {
            name: 'stars',
            data: this.state.stars
          }
        ]
        };

        const PieOptions =  {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
          },
          title: {
            text: 'Company Industry Distribution'
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          plotOptions: {
            pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true
            }
          },
          series: [{
            name: 'Industry',
            colorByPoint: true,
            data: this.state.starredIndustries
                }]
              };

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
                  <h4>Name: {this.state.name}</h4>
                </div>
                <div className = "account_row">
                  <h4>Email: {this.state.email}</h4>
                </div>
              </div>

              <div className="ui segment _Upload" id="_Upload">
                  <input name="userfile" type="file" accept="application/pdf, application/vnd.ms-excel" onChange={this.handleSubmit}/>
              </div>

              <div className="ui segment _Password" id="_Password">
              <div className = "account_row">
                <p>Current Password:</p><input placeholder="Input..." className="password_input" id = "Old" onChange = {this.InputOnChange.bind(this)}></input>
              </div>
              <div className = "account_row">
                <p>New Password:</p><input placeholder="Input..." className="password_input" id = "New" onChange = {this.InputOnChange.bind(this)}></input>
              </div>
              <div className = "account_row">
                <p>Re-enter Password:</p><input placeholder="Input..." className="password_input"  id="ReType" onChange = {this.InputOnChange.bind(this)}></input>
              </div>
              <div className = "password_btn">
                <button className="ui basic button" onClick = {this.UpdatePassword}>Update</button>
              </div>
              </div>

              <div className="ui segment _Stats" id="_Stats">
                 <h3>Resume Starred Number: {this.state.starredNumber}</h3>
                 <HighchartsReact highcharts={Highcharts} options={PieOptions}/>

              </div>

              <div className="_LogOut" id="_LogOut">
                <div className = "logout_btn">
                  <button className="ui basic blue button" onClick = {this.logoutOnClick}>LogOut</button>
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
