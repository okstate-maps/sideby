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
    this.gatherValues = this.gatherValues.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  gatherValues(modalType){
    var data = {};
    switch (modalType) {
      case "AddLayerItem":
        data.type = document.querySelectorAll("input:checked[name='layerType']")[0].value;
        data.url =  document.querySelectorAll("textarea[name='url']")[0].value;
        data.display_name = document.querySelectorAll("input[name='displayName']")[0].value;
        return data;
      case "AddOverlay":
        data.type = document.querySelectorAll("input:checked[name='overlayType']")[0].value;
        data.url =  document.querySelectorAll("textarea[name='overlayUrl']")[0].value;
        data.display_name = document.querySelectorAll("input[name='overlayDisplayName']")[0].value;
        return data;
      default:
        return
    }
  }

  handleCloseModal() {
    let modal = this.ref.current.node.children[0].children[0];
    console.log(modal);
    this.props.closeModal();
  } 

  handleSubmit() {
    let modalType = this.props.modalType;
    let data = this.gatherValues(modalType);
    this.props.modalSubmit(modalType, data);
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
      <button onClick={this.handleCloseModal}>Cancel</button>  
      <button onClick={this.handleSubmit}>OK</button>  
    </ReactModal>
    
  }
}

export default Modal;
