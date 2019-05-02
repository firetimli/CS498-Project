import React, { Component } from 'react'
import {MovieImg, ModalImgSection, ModalTextSection, Row, Column, closeModalButton, modalJobTitle, deleteJobButton, starIcon, viewResumeButton, deleteResumeButton} from './PostedJobs.module.scss'
import ReactModal from 'react-modal';
import { Icon } from 'semantic-ui-react';

import ResumeModal from './ResumeModal.jsx';
import axios from 'axios';

class JobModal extends Component {
  constructor(props) {
    super(props);

    this.state = {showModal: false, selectedResumeIndex: null, data: null};

    this.closeResumeModal = this.closeResumeModal.bind(this);
    this.findResumeNext = this.findResumeNext.bind(this);
    this.findResumePrev = this.findResumePrev.bind(this);

    this.deleteJob = this.deleteJob.bind(this);
    this.deleteResume = this.deleteResume.bind(this);
  }

  openResumeModal(e, index) {
    this.setState({ selectedResumeIndex: index, showModal: true });
  }

  closeResumeModal(e) {
    if (e !== undefined) {
      e.preventDefault();
    }
    this.setState({ selectedResumeIndex: null, showModal: false});
  }

  findResumePrev(e) {
    if (e !== undefined) {
      e.preventDefault();
    }
    this.setState(prevState => ({
      selectedResumeIndex: prevState.selectedResumeIndex - 1 }));

  }

  findResumeNext(e) {
    if (e !== undefined) {
      e.preventDefault();
    }
    this.setState(prevState => ({
      selectedResumeIndex: prevState.selectedResumeIndex + 1 }));
  }


  deleteJob(e, id) {
    console.log("-----delete job backend code here-----");
    axios.defaults.withCredentials = true;
    axios.delete('http://localhost:5000/api/job/'+id, {withCredentials: true}).then((response) => {
      window.location.href = "http://localhost:3000/recruiter";
    }).catch((error) => {
      console.log(error);
    });
  }

  deleteResume(e, jobID, resumeLink) {
    console.log("-----delete resume backend code here-----");
    console.log(jobID);
    console.log(resumeLink);
    axios.post('http://localhost:5000/api/deleteStarredResume', {link:resumeLink, id: jobID}).then((response) => {
    }).catch((error) => {
      console.log(error);
    });
  }

  componentWillMount() {
    // const {isShow, closeModal, findNext, findPrev, src } = this.props;
    console.log("----------got src--------");
    // console.log(this.props);
    axios.post('http://localhost:5000/api/getStarredUsers', {currentJob: this.props.src})
      .then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
  }
 
  componentDidMount() {
    document.body.addEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const {isShow, closeModal, findNext, findPrev, src } = this.props;
    if (!src) {
      return null;
    }

    for(var i in src.starredResumes){
      var starredUserID = src.starredResumes[i];
      console.log(starredUserID);
    }

    console.log(src);

    return (
        <ReactModal isOpen={isShow}>
            <div class="ui four column grid">
              <div class="row">
                  <div className={closeModalButton}><button className="modal-close" onClick={closeModal} onKeyDown={this.handleKeyDown}>&times;</button></div>
                  <div className={modalJobTitle}><h3>{src.title}</h3></div>
              </div>
            </div>

            <div class="ui internally celled four column grid">
              <div class="seven wide column">
                  <p><strong>Location</strong>: {src.location}</p>
                  <p><strong>End Date</strong>: {src.endDate.substring(0, 10)}</p>
                  <p><strong>Description</strong>: {src.description}</p>
                  <div className={deleteJobButton} onClick={(e) => this.deleteJob(e, src._id)}>
                    <button class="ui centered basic button">
                      <i class="trash icon"></i>
                      Delete This Job
                    </button>
                  </div>
              </div>

              <div class="internally divided nine wide column">
                <div class="ui very relaxed divided list">
                  {
                      src.starredResumes.map((resume, resumeIndex) => (
                        <div class="item">
                          <div class="middle aligned content">
                            {resume.JS_name} &nbsp;&nbsp; {resume.location}
                            <button class="ui right floated button" onClick={(e) => this.openResumeModal(e, resumeIndex)}>
                              <i class="icon user"></i>
                              View Resume
                            </button>
                            <button class="ui right floated button" onClick={(e) => this.deleteResume(e, src._id, resume.JS_resumeLink)}>
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

          <ResumeModal isShow={this.state.showModal} closeModal={this.closeResumeModal} findPrev={this.findResumePrev} findNext={this.findResumeNext} src={src.starredResumes[this.state.selectedResumeIndex]}>
          </ResumeModal>

        </ReactModal>
    );

  }}

export default JobModal
