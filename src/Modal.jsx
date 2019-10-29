import React, { Component } from 'react';
import ReactModal from 'react-modal';
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
    this.getParent = this.getParent.bind(this);
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
    this.props.rebuildTooltip(true);

  }

  getParent() {
      return document.querySelector("#modalRoot");
  }

  gatherValues(modalType){
    var data = {};
    switch (modalType) {

      case "AddLayerItem":
        data.type = document.querySelectorAll("input:checked[name='layerType']")[0].value;
        data.url =  document.getElementById("addLayerItemUrl");
        if (data.url === null){
          return null
        } 
        data.display_name = document.querySelectorAll("input[name='displayName']")[0].value;
        return data;

      case "AddOverlay":
        data.type = document.querySelectorAll("input:checked[name='overlayType']");
        data.type = data.type.length > 0 ? data.type[0].value : null;
        data.url =  document.getElementById("addOverlayUrl");
        if (data.url === null){
          return null
        } 
        data.display_name = document.querySelectorAll("input[name='overlayDisplayName']");
        data.display_name = data.display_name.length > 0 ? data.display_name[0].value: null;
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
    
    if (data.type === null) {
      alert("Type is required.");
      return;
    }
    
    if (data.url === null) {
      alert("Url is required");
      return;
    }

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
          parentSelector={this.getParent}
          contentLabel="Modal">
    	{content}
      <br/>
      <button onClick={this.handleCloseModal}>Cancel</button>  
      <button onClick={this.handleSubmit}>OK</button>  
    </ReactModal>
    
  }
}

export default Modal;