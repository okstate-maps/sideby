import React, { Component } from 'react';
//import Config from './Config';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { isMobile, fetchJson } from './Util';
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
    this.getThumbnailByLayerType.bind(this);
    this.guessLayerTypeByUrl.bind(this);
    this.state = {};

  }
 
  componentDidMount(state,props){
    this.props.rebuildTooltip();
    this.resolveThumbnail();
  }
  guessLayerTypeByUrl(){

  }

  getThumbnailByLayerType(layerType){
    var that = this;
    var default_thumb = process.env.PUBLIC_URL + '/assets/images/default.jpg';

    switch (layerType) {

      case "EsriDynamicMapLayer":
      case "EsriImageLayer":
      case "EsriTiledMapLayer":

        fetchJson(this.props.url + "/info/iteminfo?f=json").then(function (r){
            if (r.data.thumbnail) {
              that.setState({thumbnail_path: that.props.url + "/info/" + r.data.thumbnail});
            }
            else {
              that.setState({thumbnail_path: default_thumb})
            }
        });
        break;

      case "WMSTileLayer":

        if (this.props.url.indexOf('geoserver') >= 0){

          //for more on wms reflector see https://docs.geoserver.org/latest/en/user/tutorials/wmsreflector.html
          this.setState({thumbnail_path: this.props.url + "/reflect?height=200&width=300&layers=" + this.props.layers})
        }
        else {
              this.setState({thumbnail_path: default_thumb})
            }
        break;
      //case "TileLayer":

      case "WMTSTileLayer":

        if (this.props.url.indexOf('MapServer/WMTS') >= 0){
            //this.thumbnail_path = this.props.url.slice(0, this.props.url.indexOf('/WMTS')) + "/info/thumbnail/thumbnail.png";
            this.setState({thumbnail_path: this.props.url.slice(0, this.props.url.indexOf('/WMTS')) + "/info/thumbnail/thumbnail.png"});
        }
        else {
              this.setState({thumbnail_path: default_thumb})
            }
        break;

      default:
        this.setState({thumbnail_path: default_thumb})
      //case "WFSLayer":    
    }

    // if (!this.thumbnail_path) {
    //   this.guessLayerTypeByUrl(this.props.url);
    // }
  }


  resolveThumbnail() {

    var local_path = process.env.PUBLIC_URL + '/assets/images/';
    
    if (this.props.thumbnail_path){
    
      if (this.props.thumbnail_path.startsWith("http")){
    
        this.setState({thumbnail_path: this.props.thumbnail_path});
    
      }
    
      else {
        this.setState({thumbnail_path: local_path + this.props.thumbnail_path});
    
      }  

    }

    else if (this.props.type){
      this.getThumbnailByLayerType(this.props.type);
    }
  }

  infoClick(e) {
    e.stopPropagation();
    alert("info click");
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
    
    this.props.onItemClick(data);

  }

  render() {
    let dispName = this.props.display_name;
    let className = 'item ';
    if (this.props.isToggledOn){
      className = className + "on "
    }
    else {
      className = className + "off "
    }

    if (this.props.deleteModeActive) {
      className = className + "deleteModeActive";
    }

     // All of the data- attribs in the button element are for ReactTooltip purposes 
    return (

      <button className={className} 
          onClick={this.onClick} 
          style={{backgroundImage: "url('" + this.state.thumbnail_path + "')"}}
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
        

        <div className={dispName.length >= 10 ? "label long-title" : "label"}>
          {dispName.length > 20 ? dispName.slice(0, 20)+"..." : dispName}
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
