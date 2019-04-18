import React, { Component } from 'react'
import {MovieImg, ModalImgSection, ModalTextSection, Row, Column, closeModalButton, modalJobTitle, deleteJobButton, starIcon, viewResumeButton, deleteResumeButton} from './PostedJobs.module.scss'
import ReactModal from 'react-modal';
import { Icon } from 'semantic-ui-react';


class JobModal extends Component {
  constructor() {
    super();
    this.deleteJob = this.deleteJob.bind(this);
    this.deleteResume = this.deleteResume.bind(this);
  }

  deleteJob(e) {
    console.log("-----delete job backend code here-----");
  }

  viewResume(e){
    console.log("-----view resume backend code here-----");
  }

  deleteResume(e) {
    console.log("-----delete resume backend code here-----");
  }

  componentDidMount() {
    document.body.addEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const {isShow, closeModal, findNext, findPrev, src } = this.props;
    if (!src) {
      return null;
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
                  <p>Location: {src.location}</p>
                  <p>End Date: {src.endDate}</p>
                  <p>Description: {src.description}</p>
                  <div className={deleteJobButton} onClick={(e) => this.deleteJob(e)}>
                    <button class="ui centered basic button">
                      <i class="trash icon"></i>
                      Delete This Job
                    </button>
                  </div>
              </div>

              <div class="internally divided nine wide column">
                <div class="ui very relaxed divided list">
                  {
                    src.starredResumes.map(resume => (
                      <div class="item">
                        <div class="middle aligned content">
                          {resume.JS_name} &nbsp;&nbsp; {resume.location}
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

          

        </ReactModal>
    );

  }}

export default JobModal
