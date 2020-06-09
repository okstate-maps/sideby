import React, { Component } from 'react';
import ReactModal from 'react-modal';
import './Modal.css';
import './ModalButton.css';
import './Table.css';

ReactModal.setAppElement('#root');

class Modal extends Component {
  constructor(props) {
    super(props);
    this.formatContent = this.formatContent.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.ref = React.createRef(null);
    this.getParent = this.getParent.bind(this);
    this.state={};
  }

 formatContent(modalType, modalContent) {
    let content = <div id='modalContent'>
                    {modalContent}
                  </div>;
    return content;
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.props.rebuildTooltip(true);
  }

  getParent() {
    return document.querySelector('#modalRoot');
  }

  handleCloseModal() {
    this.props.closeModal();
  } 

  render() {
  	let content = this.formatContent(this.props.modalType, this.props.modalContent);
    //let options = this.props.modalOptions || {};
  	return <ReactModal
          id='modalContainer'
          ref={this.ref}
          closeTimeoutMS={500}
          className='Modal-Content'
          key={'modal'}
          isOpen={this.props.isOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.handleCloseModal}
          parentSelector={this.getParent}
          contentLabel='Modal'>
    	{content}
 
     </ReactModal>
    
  }
}

export default Modal;
