<Card>
          <Card.Content>
            <Card.Header>{this.state.jobsData[index].title}</Card.Header>
            <Card.Meta>{this.state.jobsData[index].location}</Card.Meta>
            <Card.Description>
              <div class={JD}>{this.state.jobsData[index].description[0]+"..."}</div>
            </Card.Description>
          </Card.Content>

          <Card.Content extra>
            <a>
              <Icon name='user' />
              10 Friends
            </a>
          </Card.Content>
        </Card>


        <div className={ModalImgSection}>
                <button className="modal-prev" onClick={findPrev} onKeyDown={this.handleKeyDown}>&#10094;</button>
                <button className="modal-next" onClick={findNext} onKeyDown={this.handleKeyDown}>&#10095;</button>
            </div>