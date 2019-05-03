import React, { Component } from 'react'
import ReactModal from 'react-modal';
import { Icon } from 'semantic-ui-react';
import {closeModalButton, modalJobTitle, ResumeModalImgSection, starIcon, starResumeButton} from './PostedJobs.module.scss'
import axios from 'axios';
import { BASE_URL, BASE_URL_WITHOUT_API} from '../../utils/prod';


class SearchResumeModal extends Component {
  constructor(props) {
    super(props);
  }

  starResume(e){
    console.log("+++++++++++");
    console.log(this.props.src._id);
    console.log(this.props.job._id);
    axios.post(`${BASE_URL}starResume`, {job: this.props.job, starredUser: this.props.src})
      .then((response) => {
      	console.log(response);
        // console.log(this.state.starredUsers);
      }).catch((error) => {
        console.log(error);
      });
    console.log("------------");
  }

  componentDidMount() {
    document.body.addEventListener('keydown', this.handleKeyDown);
  }

  render() {
    const {isShow, closeModal, findNext, findPrev, src, job } = this.props;
    if (!src) {
      return null;
    }

    // console.log(src);
    let resumeUrl = `${BASE_URL_WITHOUT_API}uplodas/${src.username}/resume.pdf`
    return (
        <ReactModal isOpen={isShow}>
            <div class="ui four column grid">
              <div class="row">
                  <div className={closeModalButton}><button className="modal-close" onClick={closeModal} onKeyDown={this.handleKeyDown}>&times;</button></div>
                  <div className={modalJobTitle}><h3>{src.username}</h3></div>
              </div>
            </div>

            <div className={ResumeModalImgSection}>
                <button onClick={findPrev} onKeyDown={this.handleKeyDown}>&#10094;</button>
                <iframe style={{width:1100, height:1500}} src={resumeUrl}/>
                <button onClick={findNext} onKeyDown={this.handleKeyDown}>&#10095;</button>
            </div>

            <div className={starResumeButton} onClick={(e) => this.starResume(e)}>
              <button class="ui right floated button">
                <i class="icon star"></i>
                Star Resume
              </button>
            </div>

        </ReactModal>
    );

  }}

export default SearchResumeModal
