import React, { Component } from 'react';
import ReactModal from 'react-modal';
import CircleLoader from 'react-spinners/CircleLoader';
import './Modal.css';

ReactModal.setAppElement('#root');

class Modal extends Component {
  constructor(props) {
    super(props);
    this.formatContent = this.formatContent.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.ref = React.createRef(null);
    this.state={};
  }

formatContent(modalType, modalContent) {
    let content = <div className="modalContent">
                    {modalContent}
                  </div>;
    return content;
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.

  }

  handleCloseModal() {
    let modal = this.ref.current.node.children[0].children[0];
    console.log(modal);
    this.props.closeModal();
  }

  render() {
  	let content = this.formatContent(this.props.modalType, this.props.modalContent);
  	return <ReactModal
          ref={this.ref}
          closeTimeoutMS={500}
          className="Modal-Content"
          key={"modal"}
          isOpen={this.props.isOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.handleCloseModal}
          contentLabel="Example Modal">
    	{content}
      <br/>
      <button onClick={this.handleCloseModal}>Close Modal</button>  
    </ReactModal>
    
  }
}

export default Modal;
