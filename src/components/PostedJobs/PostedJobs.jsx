import React, { Component } from 'react'

import JobModal from './JobModal.jsx';
import { ModalView as Modals, ModalImg, JobsGalleryContainer, JobDescription as JD, JobCard} from './PostedJobs.module.scss'
import { Card, Image, Icon } from 'semantic-ui-react';

class PostedJobs extends Component {

  constructor(props) {
    super(props);
    this.state = { showModal: false, selectedJobIndex: null, jobsData:[{"title":"Software Engineer", "endDate":"May 10 2019", "location":"San Francisco", "description": ["Experience working with a large codebase on a cross functional team", "Strong knowledge of SQL, Bachelor’s degree in Computer Science, computer engineering, electrical engineering OR equivalent work experience"], "starredNumber":10, "starredResumes":[{"JS_name":"Alex", "JS_resumeLink": "111.com", "location":"Los Angeles"}, {"JS_name":"Mary", "JS_resumeLink": "111.com", "location":"Chicago"}, {"JS_name":"Mary", "JS_resumeLink": "111.com", "location":"Boston"}]},
                                                                       {"title":"Product Manager", "endDate":"June 1 2019", "location":"Los Angeles", "description": ["Strong knowledge of common back-end Web technologies (such as Ruby on Rails, Python, etc) in a production environment", "An ability to balance a sense of urgency with shipping high quality and pragmatic solutions"], "starredNumber": 23, "starredResumes":[{"JS_name":"Peter", "JS_resumeLink":"222.com"}]},
                                                                       {"title":"Senior Software Engineer", "endDate":"May 20 2019", "location":"Chicago", "description": ["Experience working with a large codebase on a cross functional team", "Strong knowledge of SQL, Bachelor’s degree in Computer Science, computer engineering, electrical engineering OR equivalent work experience"], "starredNumber":16, "starredResumes":[{"JS_name":"Mary", "JS_resumeLink":"333.com"}]} ]};

    this.closeModal = this.closeModal.bind(this);
    this.findNext = this.findNext.bind(this);
    this.findPrev = this.findPrev.bind(this);
    this.renderOneJob = this.renderOneJob.bind(this);
  }

  renderOneJob(src, index) {
    return (
      <div onClick={(e) => this.openModal(e, index)}>
        <div class="ui card">
          <div class="content">
            <h3>{this.state.jobsData[index].title}</h3>
            <div class="meta">
              <span class="date">{this.state.jobsData[index].location}</span>
            </div>
            <div class={JD}>
              {this.state.jobsData[index].description[0]+"..."}
            </div>
          </div>
          <div class="extra content">
            <a>
              <i class="user icon"></i>
              {this.state.jobsData[index].starredNumber + " starred"}
            </a>
          </div>
        </div>

      </div>

    );
  }

  openModal(e, index) {
    this.setState({ selectedJobIndex: index, showModal: true });
  }

  closeModal(e) {
    if (e !== undefined) {
      e.preventDefault();
    }
    this.setState({ selectedJobIndex: null, showModal: false});
  }

  findPrev(e) {
    if (e !== undefined) {
      e.preventDefault();
    }
    this.setState(prevState => ({
      selectedJobIndex: prevState.selectedJobIndex - 1 }));

  }

  findNext(e) {
    if (e !== undefined) {
      e.preventDefault();
    }
    this.setState(prevState => ({
      selectedJobIndex: prevState.selectedJobIndex + 1 }));
  }


  render() {

    return (
      <div>
        <div className={JobsGalleryContainer}>
            <div className={Modals}>
              {this.state.jobsData.map(this.renderOneJob)}
            </div>
        </div>

        <JobModal isShow={this.state.showModal} closeModal={this.closeModal} findPrev={this.findPrev} findNext={this.findNext} src={this.state.jobsData[this.state.selectedJobIndex]}>
        </JobModal>
      </div>

/* ANOTHER WAY TO RENDER: USER React.createElement
      React.createElement("div", { className: GalleryContainer },
      React.createElement("div", { className: Modals },

      this.state.moviesData.map(this.renderImageContent)),

      React.createElement(GalleryModal, {
        isShow: this.state.showModal,
        closeModal: this.closeModal,
        findPrev: this.findPrev,
        findNext: this.findNext,
        hasPrev: this.state.selectedMovieIndex > 0,
        hasNext: this.state.selectedMovieIndex + 1 < this.state.moviesData.length,
        src: this.state.moviesData[this.state.selectedMovieIndex] })
      )
*/

    );
  }
}

export default PostedJobs
