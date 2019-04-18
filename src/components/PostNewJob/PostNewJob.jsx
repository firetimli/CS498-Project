import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, Menu} from 'semantic-ui-react'
import './PostNewJob.css'

class PostNewJob extends Component {
  state = {
    Title : '',
    EndDate : '',
    Location : '',
    Description : ''
  }

 onChange = (e) => {
    console.log(e.target.id)
    if(e.target.id == "1"){
      this.setState({Title: e.target.value})
    }
    if(e.target.id == "2"){
      this.setState({EndDate: e.target.value})
    }
    if(e.target.id == "3"){
      this.setState({Location: e.target.value})
    }
    if(e.target.id == "4"){
      this.setState({Description: e.target.value})
    }
    // this.setState({Title:e.target.value})
  }

 onClick = () => {
   // make job post
 }
  render() {

	    return(
	      <div className = "wrapper">
          <div className = "Item">
            <div className="ui labeled input Inputs">
              <div className="ui basic label">
                Title
              </div>
              <input type="text" placeholder="Enter Job Title.." id = "1" onChange = {this.onChange.bind(this)}></input>
            </div>
          </div>

          <div className = "Item">
            <div className="ui labeled input Inputs">
              <div className="ui basic label">
                End Dates
              </div>
              <input type="text" placeholder="dd/mm/yy" id = "2" onChange = {this.onChange.bind(this)}></input>
            </div>
          </div>

          <div className = "Item">
            <div className="ui labeled input Inputs">
              <div className="ui basic label">
                Location
              </div>
              <input type="text" placeholder="Enter Job Location.." id = "3" onChange = {this.onChange.bind(this)}></input>
            </div>
          </div>

          <div className = "Item">
            <form className = "ui form Description">
                <textarea
                  type="text"
                  placeholder="Enter Job Description"
                  rows="10"
                  id = "4" onChange = {this.onChange.bind(this, 4)}
                />
            </form>
          </div>

          <div className = "Item">

            <button class="ui blue basic button Button" onClick = {this.onClick}>Post Job!</button>
          </div>

	      </div>
	    )
  }

}

export default PostNewJob
