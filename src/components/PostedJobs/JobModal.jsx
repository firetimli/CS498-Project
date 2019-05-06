import React, { Component } from 'react'
import {MovieImg, ModalImgSection, ModalTextSection, Row, Column, closeModalButton, modalJobTitle, deleteJobButton, starIcon, viewResumeButton, deleteResumeButton} from './PostedJobs.module.scss'
import ReactModal from 'react-modal';
import { Icon } from 'semantic-ui-react';
import { BASE_URL, BASE_URL_REACT} from '../../utils/prod';

import ResumeModal from './ResumeModal.jsx';
import axios from 'axios';

class JobModal extends Component {
  constructor(props) {
    super(props);

    this.state = {showModal: false, selectedResumeIndex: null, data: null, starredUsers: []};

    this.closeResumeModal = this.closeResumeModal.bind(this);
    this.findResumeNext = this.findResumeNext.bind(this);
    this.findResumePrev = this.findResumePrev.bind(this);

    this.deleteJob = this.deleteJob.bind(this);
    this.deleteResume = this.deleteResume.bind(this);
  }

  openResumeModal(e, index) {
    this.setState({ selectedResumeIndex: index, showModal: true });

    var userIndex = index;
    console.log('Viewing resume' + userIndex)

    var opened_resume_userid = this.state.starredUsers[userIndex]['_id']
    console.log('opened resume user id' + opened_resume_userid);

    axios.post(`${BASE_URL}open_resume`, {id: opened_resume_userid}, {withCredentials: true})
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
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
    axios.delete(`${BASE_URL}job/${id}`, {withCredentials: true}).then((response) => {
      window.location.href = `${BASE_URL_REACT}recruiter`;
    }).catch((error) => {
      console.log(error);
    });
  }

  deleteResume(e, jobID, userid) {
    console.log("-----delete resume backend code here-----");
    console.log(jobID);
    console.log(userid);
    var obj = this;
    axios.post(`${BASE_URL}deleteStarredResume`, {jobid:jobID, userid: userid})
    .then((response) => {
      obj.pullStarredUsers();
    }).catch((error) => {
      console.log(error);
    });
  }

  pullStarredUsers = () => {
    // const {isShow, closeModal, findNext, findPrev, src } = this.props;
    console.log("----------pulled starredResumes--------");
    console.log(this.props);
    // console.log(this.props);
    axios.post(`${BASE_URL}getStarredUsers`, {currentJobId: this.props.src._id})
      .then((response) => {
        console.log("----------starred users after fetching--------");
        console.log(response.data.starredUsers);
        this.setState({starredUsers: response.data.starredUsers});
        // console.log(this.state.starredUsers);
      }).catch((error) => {
        console.log('pull error');
        console.log(error);
      });
  }

  componentWillMount() {
    this.pullStarredUsers();
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
    let resumemodal;
    if(this.state.showModal) {
      resumemodal = <ResumeModal isShow={this.state.showModal} closeModal={this.closeResumeModal} findPrev={this.findResumePrev} findNext={this.findResumeNext} src={this.state.starredUsers[this.state.selectedResumeIndex]}></ResumeModal>
    }
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
                      this.state.starredUsers.map((user, userIndex) => (
                        <div class="item">
                          <div class="middle aligned content">
                            {user.username} &nbsp;&nbsp;
                            <button class="ui right floated button" onClick={(e) => this.openResumeModal(e, userIndex)}>
                              <i class="icon user"></i>
                              View Resume
                            </button>
                            <button class="ui right floated button" onClick={(e) => this.deleteResume(e, src._id, user._id)}>
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

          {resumemodal}

        </ReactModal>
    );

  }}

export default JobModal
