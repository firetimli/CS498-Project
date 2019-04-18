import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, Menu} from 'semantic-ui-react'
import "./Search.css"

class Search extends Component {

  viewResume(e){
    console.log("-----view resume backend code here-----");
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

  };

  onChange = (e) => {
    var idx = e.target.value
    this.setState({SelectedJob:this.state.JobList[idx]});
    console.log(this.state.SelectedJob.description)
  }

  render() {

      return (
        <div className = "ui grid">
          <div className="two wide column">
          </div>
          <div className="five wide column search_container">
            <select class="ui search dropdown" onChange = {this.onChange.bind(this)}>
                {this.state.JobList.map(item =>(
                  <option value = {item.id}>{item.title}</option>
                ))}
            </select>

            <div class = "ui items">
              <div class = "item">
              <div class="content">
                <p class="header">{this.state.SelectedJob.title}</p>
                <div class="meta">
                  <span>Description</span>
                </div>
                <div class="description">
                  {this.state.SelectedJob.description.map(item => (
                    <li className="list">{item}</li>
                  ))}
                </div>
              </div>
              </div>
            </div>

            <div className = "search_btn">
              <button className="ui basic blue button">Search</button>
            </div>


          </div>
          <div className="seven wide column">
            <div class="searchedList">
              <div class="internally divided twelve wide column">
                  <div class="ui very relaxed divided list">
                    {
                      this.state.SelectedJob.starredResumes.map(resume => (
                        <div class="item">
                          <div class="middle aligned content">
                            {resume.JS_name} &nbsp;&nbsp; {resume.location} &nbsp;&nbsp; {resume.score}
                            <button class="ui right floated button" onClick={(e) => this.viewResume(e)}>
                              <i class="icon user"></i>
                              View Resume
                            </button>
                            <button class="ui right floated button" onClick={(e) => this.deleteResume(e)}>
                              <i class="icon trash"></i>
                              Delete Resume
                            </button>
                          </div>
                        </div>
                      ))
                    }
                    </div>
                </div>
              </div>
          </div>

          <div className="two wide column">
          </div>

        </div>
      )
  }

}

export default Search
