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
    this.gatherValues = this.gatherValues.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.ref = React.createRef(null);
    this.getParent = this.getParent.bind(this);
    this.state={};
  }

 formatContent(modalType, modalContent) {
    let content = <div id="modalContent">
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
        data.type = document.querySelectorAll("input:checked[name='layerType']");
        data.type = data.type.length > 0 ? data.type[0].value : null;
        data.url =  document.getElementById("addLayerItemUrl");
        if (data.url === null){
          return null
        } 
        data.url = data.url.value === "" ? null : data.url.value; 
        data.display_name = document.querySelectorAll("input[name='displayName']");
        data.display_name = data.display_name.length > 0 ? data.display_name[0].value: null;
        data.thumbnail_file = document.querySelectorAll("input[name='thumbnailPath']");
        data.thumbnail_file = data.thumbnail_file.length > 0 ? data.thumbnail_file[0].value : null;
        return data;

      case "AddOverlay":
        data.type = document.querySelectorAll("input:checked[name='overlayType']");
        data.type = data.type.length > 0 ? data.type[0].value : null;
        data.url =  document.getElementById("addOverlayUrl");
        if (data.url === null){
          return null
        }
        data.url = data.url.value === "" ? null : data.url.value; 
        data.display_name = document.querySelectorAll("input[name='overlayDisplayName']");
        data.display_name = data.display_name.length > 0 ? data.display_name[0].value: null;
        return data;
        
      default:
        return
    }
  }

  handleCloseModal() {
    this.props.closeModal();
  } 

  handleSubmit() {
    let modalType = this.props.modalType;
    let data = this.gatherValues(modalType);
    if (data.url === null) {
      alert("Url is required");
      return;
    }
    if (data.type === null) {
      alert("Type is required.");
      return;
    }
    

    this.props.modalSubmit(modalType, data);
    this.props.closeModal();

  }

  render() {
  	let content = this.formatContent(this.props.modalType, this.props.modalContent);
    let options = this.props.modalOptions || {};
  	return <ReactModal
          id="modalContainer"
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
 
      {/*   
      {!options.noSubmit &&
        <> 
          <button onClick={this.handleCloseModal}>Cancel</button>
          <button onClick={this.handleSubmit}>OK</button>  
        </>
      }

      {options.noSubmit && 
        <button onClick={this.handleCloseModal}>OK</button>
      }
      */}

    </ReactModal>
    
  }
}

export default Modal;
