import React, { Component } from 'react'
import ReactModal from 'react-modal';
import { Icon } from 'semantic-ui-react';
import {closeModalButton, modalJobTitle, ResumeModalImgSection, starIcon, starResumeButton} from './PostedJobs.module.scss'


class ResumeModal extends Component {
  constructor(props) {
    super(props);
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
                  <div className={modalJobTitle}><h3>{src.JS_name} &nbsp;&nbsp; {src.location}</h3></div>
              </div>
            </div>

            <div className={ResumeModalImgSection}>
                <button onClick={findPrev} onKeyDown={this.handleKeyDown}>&#10094;</button>
                <img style={{width:1100, height:1500}} src={src.JS_resumeLink}/>
                <button onClick={findNext} onKeyDown={this.handleKeyDown}>&#10095;</button>
            </div>

            <div className={starResumeButton}>
              <button class="ui right floated button">
                <i class="icon star"></i>
                Star Resume
              </button>
            </div>

        </ReactModal>
    );

  }}

export default ResumeModal
