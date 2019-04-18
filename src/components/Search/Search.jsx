import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, Menu} from 'semantic-ui-react'
import "./Search.css"

class Search extends Component {
  state = {
    JobList :[{"id":0,"title":"Software Engineer", "endDate":"May 10 2019", "location":"San Francisco", "description": ["Experience working with a large codebase on a cross functional team", "Strong knowledge of SQL, Bachelor’s degree in Computer Science, computer engineering, electrical engineering OR equivalent work experience"], "starredNumber":10},
                                                                     {"id":1,"title":"Product Manager", "endDate":"June 1 2019", "location":"Los Angeles", "description": ["Strong knowledge of common back-end Web technologies (such as Ruby on Rails, Python, etc) in a production environment", "An ability to balance a sense of urgency with shipping high quality and pragmatic solutions"], "starredNumber": 23},
                                                                       {"id":2,"title":"Senior Software Engineer", "endDate":"May 20 2019", "location":"Chicago", "description": ["Experience working with a large codebase on a cross functional team", "Strong knowledge of SQL, Bachelor’s degree in Computer Science, computer engineering, electrical engineering OR equivalent work experience"], "starredNumber":16}],
    SelectedJob : {"id":0,"title":"Software Engineer", "endDate":"May 10 2019", "location":"San Francisco", "description": ["Experience working with a large codebase on a cross functional team", "Strong knowledge of SQL, Bachelor’s degree in Computer Science, computer engineering, electrical engineering OR equivalent work experience"], "starredNumber":10},

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
          <div className="four wide column search_container">
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
          <div className="eight wide column">
          </div>
          <div className="two wide column">
          </div>

	      </div>
	    )
  }

}

export default Search
