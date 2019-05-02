import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Menu} from 'semantic-ui-react';
import "./Search.css";
import axios from 'axios';
import ResumeModal from '../PostedJobs/ResumeModal.jsx';

class Search extends Component {

  openResumeModal = (e) => {
    this.setState({ selectedResumeIndex: e.target.value, showModal: true });
    console.log(this.state.showModal)
  }

  closeResumeModal = (e) => {
    if (e !== undefined) {
      e.preventDefault();
    }
    this.setState({ selectedResumeIndex: null, showModal: false});
  }

  findResumePrev = (e) => {
    if (e !== undefined) {
      e.preventDefault();
    }
    this.setState(prevState => ({
      selectedResumeIndex: prevState.selectedResumeIndex - 1 }));
    console.log(this.state.selectedResumeIndex)
    console.log(this.state.showModal)
  }

  findResumeNext = (e) => {
    if (e !== undefined) {
      e.preventDefault();
    }
    this.setState(prevState => ({
      selectedResumeIndex: prevState.selectedResumeIndex + 1 }));
    console.log(this.state.selectedResumeIndex)
    console.log(this.state.showModal)
  }

  searchOnClick = (event) => {
    console.log("Search clicked " + typeof(this.state.SelectedJob.description));

    //var joinedJobDescription = this.state.SelectedJob.description.join("");
    var obj = this;
    axios.post('http://localhost:5000/api/search', {jobDescription: obj.state.SelectedJob.description}, {withCredentials: true})
      .then(function (response) {
        console.log('user profiles');
        console.log(response);
        obj.setState({
          relevantUsers: response.data.ret
        });
      })
      .catch(function (error) {
        console.log('user profile err');
        console.log(error);
      });
  }

  deleteResume(e) {
      console.log("-----delete resume backend code here-----");
  }
  state = {
    JobList :[{"id":0,"title":"Software Engineer", "endDate":"May 10 2019", "location":"San Francisco",
                      "description": ["Experience working with a large codebase on a cross functional team", "Strong knowledge of SQL, Bachelor’s degree in Computer Science, computer engineering, electrical engineering OR equivalent work experience"],
                      "starredNumber":10, "starredResumes":[{"score":0.25, "JS_name":"Alex", "JS_resumeLink": "111.com", "location":"Los Angeles"}, {"score":0.18, "JS_name":"Mary", "JS_resumeLink": "111.com", "location":"Chicago"}, {"score":0.15, "JS_name":"Mary", "JS_resumeLink": "111.com", "location":"Boston"}]},
              {"id":1,"title":"Product Manager", "endDate":"June 1 2019", "location":"Los Angeles",
                      "description": ["Strong knowledge of common back-end Web technologies (such as Ruby on Rails, Python, etc) in a production environment", "An ability to balance a sense of urgency with shipping high quality and pragmatic solutions"],
                      "starredNumber": 23, "starredResumes":[{"score":0.20, "JS_name":"Peter", "JS_resumeLink":"222.com"}]},
              {"id":2,"title":"Senior Software Engineer", "endDate":"May 20 2019", "location":"Chicago",
                      "description": ["Experience working with a large codebase on a cross functional team", "Strong knowledge of SQL, Bachelor’s degree in Computer Science, computer engineering, electrical engineering OR equivalent work experience"],
                      "starredNumber":16, "starredResumes":[{"score":0.13, "JS_name":"Ali", "JS_resumeLink":"333.com"}]} ],
    SelectedJob : {"id":0,"title":"Software Engineer", "endDate":"May 10 2019", "location":"San Francisco",
                          "description": ["Experience working with a large codebase on a cross functional team", "Strong knowledge of SQL, Bachelor’s degree in Computer Science, computer engineering, electrical engineering OR equivalent work experience"],
                          "starredNumber":10,  "starredResumes":[{"score":0.25, "JS_name":"Alex", "JS_resumeLink": "111.com", "location":"Los Angeles"}, {"score":0.18, "JS_name":"Mary", "JS_resumeLink": "111.com", "location":"Chicago"}, {"score":0.15, "JS_name":"Mary", "JS_resumeLink": "111.com", "location":"Boston"}]},
    description_list: [],
    relevantUsers:[],
    selectedResumeIndex : 0,
    showModal: false,
  };

  onChange = (e) => {
    var idx = e.target.value;
    console.log('idx is ')
    console.log(idx)
    var templist = this.state.JobList[idx].description.split('.').filter((item) => {
      return item != "";
    });
    this.setState({
      SelectedJob: this.state.JobList[idx],
      description_list: templist
    });
  }

  componentDidMount() {
    axios.defaults.withCredentials = true;
    axios.get('http://localhost:5000/api/job', {withCredentials: true}).then((response) => {
      //this.setState({SelectedJob: response.data.ret[0]});
      console.log('selectedjob desc: ' + response.data.ret[0].description);
      this.setState({
        JobList: response.data.ret,
        SelectedJob: response.data.ret[0],
        description_list: response.data.ret[0].description.split('.')
      });

    }).catch((error) => {
      console.log(error);
    });
  }

  render() {

      return (
        <div className = "ui grid">
          <div className="two wide column">
          </div>
          <div className="five wide column search_container">
            <select class="ui search dropdown" onChange = {this.onChange.bind(this)}>
                {this.state.JobList.map((item, index) =>(
                  <option value={index}> {item.title} </option>
                ))}
            </select>

            <div className = "ui items">
              <div className = "item">
              <div className="content">
                <p className="header">{this.state.SelectedJob.title}</p>
                <div className="meta">
                  <span>Description</span>
                </div>
                <div class="description">

                {this.state.description_list.map(item => (
                  <li className="list">{item}</li>
                ))}
                </div>
              </div>
              </div>
            </div>

            <div className = "search_btn">
              <button className="ui basic blue button" onClick = {this.searchOnClick}>Search</button>
            </div>


          </div>
          <div className="seven wide column">
            <div class="searchedList">
              <div class="internally divided twelve wide column">
                  <div class="ui very relaxed divided list">
                    {
                      this.state.relevantUsers.map((user, userIndex) => (
                        <div class="item">
                          <div class="middle aligned content">
                            {user.username} &nbsp;&nbsp; {user.location} &nbsp;&nbsp; {user.score}
                            <button class="ui right floated button" value = {userIndex} onClick={this.openResumeModal.bind(this)}>
                              <i class="icon user"></i>
                              View Resume
                            </button>
                          </div>
                        </div>
                      ))
                    }
                    </div>
                </div>
              </div>
          </div>

          <ResumeModal isShow={this.state.showModal} closeModal={this.closeResumeModal} findPrev={this.findResumePrev} findNext={this.findResumeNext} src={this.state.SelectedJob.starredResumes[this.state.selectedResumeIndex]}>
          </ResumeModal>
        </div>
      )
  }

}

export default Search
