import React, { Component } from 'react';
//import Config from './Config';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { getThumbnailByLayerType } from './Helpers';
import { isMobile } from './Util';
import './Item.css';

library.add(faInfoCircle);
library.add(faCircle);
library.add(faTrash);

class Item extends Component {

  constructor(props) {
    super(props);
    this.Config = window.sideby.Config;
    this.onClick = this.onClick.bind(this);
    this.infoClick = this.infoClick.bind(this);
    this.resolveThumbnail.bind(this);
    this.state = {};

  }
 
  componentDidMount(state,props){
    this.props.rebuildTooltip();
    this.resolveThumbnail();    
  }

  resolveThumbnail() {

    var local_path = process.env.PUBLIC_URL + '/assets/layer_thumbnails/';
    var static_path = process.env.PUBLIC_URL;    
    if (this.props.thumbnail_path){
    
      if (this.props.thumbnail_path.startsWith('http') ||
          this.props.thumbnail_path.startsWith('data:image') ){
    
        this.setState({thumbnail_path: this.props.thumbnail_path});
    
      }
    
      else if (this.props.thumbnail_path.startsWith('/static')) {

        this.setState({thumbnail_path: static_path + this.props.thumbnail_path});

      }
      
      else {
        this.setState({thumbnail_path: local_path + 
                                       this.props.thumbnail_path});
    
      }  
      return;
    }

    if (this.props.layer_type){
      this.setState({thumbnail_path: getThumbnailByLayerType(this.props)});
      return;
    }
  }

  infoClick(e) {
    e.stopPropagation();
    alert('info click');
  }

  onClick(e) {

    let numLyrs = this.props.numberOfLayersOn;

    if (numLyrs === this.Config.maxLayers) {
      if (!this.props.isToggledOn){
        this.props.openModal('maxLayers', 
          this.Config.maxLayersWarning.replace('{maxLayers}', 
          this.Config.maxLayers), 
          {noSubmit: true}
        );
        return
      }
    }

    if (this.props.deleteModeActive){
      
      if (this.props.isToggledOn){
      
        let data = {...this.props};
        data.isToggledOn = !this.props.isToggledOn;
        delete data.deleteModeActive;      
        delete data.onItemClick;
        
        this.props.onItemClick(data);

      } 

      this.props.deleteLayer(this.props.id);
      return;
    }


    let data = {...this.props};
    data.isToggledOn = !this.props.isToggledOn;
    delete data.deleteModeActive;      
    delete data.onItemClick;
    delete data.numberOfLayersOn;
    
    this.props.onItemClick(data);

  }

  render() {
    let dispName = this.props.display_name;
    
     // All of the data- attribs in the button element are for ReactTooltip purposes 
    return (

      <button className={this.props.isToggledOn ? 'item on': 'item off'} 
          onClick={this.onClick} 
          style={{backgroundImage: 'url("' + this.state.thumbnail_path + '")'}}
          id={this.props.id}
          data-tip={this.props.display_name} 
          data-place='top'
          data-for='modal' 
          data-event='mouseover'
          data-delay-show='900'
          data-event-off='mouseout'
          data-clickable='false'
          data-tip-disable={isMobile}
          >
          <div className={this.props.deleteModeActive ? 'deleteModeOn' : 'deleteModeOff'}>
            <FontAwesomeIcon icon='trash' color='red' size='5x'  />
          </div>
        

        <div className={dispName.length >= 10 ? 'label long-title' : 'label'}>
          {dispName.length > 20 ? dispName.slice(0, 20)+'...' : dispName}
        </div>

       {/* 
        <span onClick={this.infoClick} 
              className='layerInfoButton fa-layers fa-fw'
              data-tip='View Layer Information'
              data-place='top'
              data-for='modal' 
              data-event='mouseover'
              data-delay-show='900'
              data-clickable='false'
              data-event-off='mouseout'>
          <FontAwesomeIcon icon='circle' color='var(--label-color)' transform='grow-6'  />
          <FontAwesomeIcon 
              icon='info-circle'
              color='#2b2b2b'
              transform='grow-6'
              />
          </span>
        */}

      </button>
    );
  }
}

export default Item;
