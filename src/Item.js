import React, { Component } from 'react';
//import Config from './Config';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faCircle } from '@fortawesome/free-solid-svg-icons';
import './Item.css';

library.add(faInfoCircle);
library.add(faCircle);

class Item extends Component {

  constructor(props) {
    super(props);
    this.Config = window.sideby.Config;
    this.onClick = this.onClick.bind(this);
    this.resolveThumbnail.bind(this);
    this.getThumbnailByLayerType.bind(this);
    this.guessLayerTypeByUrl.bind(this);
    this.resolveThumbnail();

  }
 
  guessLayerTypeByUrl(){

  }

  getThumbnailByLayerType(layerType){

    // switch (layerType) {

    //   case "TileLayer" {

    //   }
    // }
  }


  resolveThumbnail() {
    if (this.props.thumbnail_file){
      if (this.props.thumbnail_file.startsWith("http")){
        this.thumbnail_path = this.props.thumbnail_file;
      }
      else {
        this.thumbnail_path = process.env.PUBLIC_URL + '/assets/images/' + this.props.thumbnail_file;
      }  
    }
    if (this.props.type){
      this.getThumbnailByLayerType(this.props.type);
    }
  }

  onClick(e) {

    let numLyrs = this.props.numberOfLayersOn;
  
    if (numLyrs === this.Config.maxLayers) {
      if (!this.props.isToggledOn){
        this.props.openModal("maxLayers", 
          this.Config.maxLayersWarning.replace("{maxLayers}", 
          this.Config.maxLayers), 
          {noSubmit: true}
        );
        return
      }
    }

    let data = {...this.props};
    data.isToggledOn = !this.props.isToggledOn;
       
    delete(data.onItemClick);
    
    this.props.onItemClick(data);



    //   "sortVal": this.props.sortVal,
    //   "id": this.props.id,
    //   "thumbnail_file": this.props.thumbnail_file,
    //   "url": this.props.url,
    //   "type": this.props.type,
    //   "layers": this.props.layers,
    //   "maxZoom": this.props.maxZoom,
    //   "display_name": this.props.display_name

  }

  render() {
    let dispName = this.props.display_name;
    return (
      <button className={this.props.isToggledOn ? 'item on' : 'item off'} 
          onClick={this.onClick} 
          style={{backgroundImage: "url('" + this.thumbnail_path + "')"}}
          id={this.props.id}>
        <div className={dispName.length >= 10 ? "label long-title" : "label"}>
          {dispName.length >= 20 ? dispName.slice(0,21)+"..." : dispName}
        </div>

       {/* 
        <span className='layerInfoButton fa-layers fa-fw'>
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
