import React, { Component } from 'react';
import Fullscreen from 'react-fullscreen-crossbrowser';
import { cloneDeep } from 'lodash';
import shortid from 'shortid';
import { findWithAttr, moveWithinArray } from './Util';
import UtilityBar from './UtilityBar';
import ViewBar from './ViewBar';
import Modal from './Modal';
import Tooltip from './Tooltip';
import MapsContainer from './MapsContainer';
//import Config, { welcomeText, siteTitle } from './Config';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.Config = window.sideby.Config;
    this.handleItemClick = this.handleItemClick.bind(this);
    this.transmitGeocode = this.transmitGeocode.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.toggleLabels = this.toggleLabels.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleViewbarVisibility = this.toggleViewbarVisibility.bind(this);
    this.rebuildTooltip = this.rebuildTooltip.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.modalSubmit = this.modalSubmit.bind(this);
    this.calculateDisplayIndexes = this.calculateDisplayIndexes.bind(this);
    this.calculateRowLayers = this.calculateRowLayers.bind(this);
    this.updateLayerDisplayIndexesAndRows = this.updateLayerDisplayIndexesAndRows.bind(this);
    this.addOverlay = this.addOverlay.bind(this);
    this.deleteOverlay = this.deleteOverlay.bind(this);
    this.addLayer = this.addLayer.bind(this);
    this.state = {"layers":[],
                  "overlays": this.Config.defaultOverlays || [],
                  "numberOfLayersOn": 0, 
                  "geocodeResult": {},
                  "labelLayerOn": true,
                  "rebuildTooltip": false,
                  "modalIsOpen": false,
                  "modalContent": "",
                  "viewbarVisible": true};
    
    //for the initial app load, set state using LayersInfo
    let viewbarLayers = window.sideby.LayersInfo.map(item => 
        ({...item, isToggledOn: false, id: shortid.generate()})
      );
    this.state.viewbarLayers =  viewbarLayers.sort( (a, b) => {
      return b.sortVal - a.sortVal
    });

  }

  /*
    Function that is used to move the response received by 
    the Geocoder component from the Geocoder, up to the App,
    and then back down to the MapsContainer
  */
  transmitGeocode(geocode) {
    this.setState({"geocode": geocode});
  }


  /*
    Toggle fullscreen mode. Used by FullscreenToggle component on the UtilityBar
  */
  toggleFullscreen() {
    let current_val = this.state.isFullscreenEnabled;
    this.setState({isFullscreenEnabled: !current_val});
  }

  /*
    Toggle map labels
  */
  toggleLabels() {
    let curr = this.state.labelLayerOn;
    this.setState({"labelLayerOn": !curr});
  }


  toggleViewbarVisibility() {
    let current_val = this.state.viewbarVisible;
    this.setState({viewbarVisible: !current_val});
  }

  toggleModal(bool) {
    this.setState({"modalIsOpen": bool});
  }

  modalSubmit(modalType, data){
    //console.log(modalType);
    //console.log(data);
    switch (modalType){
      case "AddLayerItem":
        this.addLayer(data);
        break;
      case "AddOverlay":
        this.addOverlay(data);
        break;
      default:
        console.log("mooooo");
    }

  }

  renderModal(){

  }

  openModal(modalType, modalContent, modalOptions){
    
    this.setState({
      modalType: modalType,
      modalContent: modalContent,
      modalOptions: modalOptions
    });
    this.toggleModal(true);

  }
  
  closeModal() {
    this.toggleModal(false);
  }

  rebuildTooltip(bool) {
    console.log("rebuildTooltip", bool);
    this.setState({"rebuildTooltip": bool});
  }

  addOverlay(data) {
    //console.log("------ ADD OVERLAY ------");
    let overlays = cloneDeep(this.state.overlays);  
    var new_layer = data;
    new_layer.isOverlay = true;
    new_layer.id = shortid.generate();
    new_layer.interactive = false;
    overlays.push(new_layer);
    this.setState({"overlays": overlays});
  }

  deleteOverlay(obj) {
    let id = obj.currentTarget.dataset.overlayId;
    document.getElementById(id).style.display = "none";
    let overlays = cloneDeep(this.state.overlays);
    let matchIndex = findWithAttr(overlays, "id", id);
    overlays.splice(matchIndex, 1);
    this.setState({"overlays": overlays});

  }

  addLayer(data) {
    //console.log(data);
    let new_layer = data,
      id = shortid.generate(), 
      maxZoom = 20;

    new_layer.id = id;
    new_layer.maxZoom = maxZoom;
    
    let state = {"viewbarLayers": this.state.viewbarLayers};
    state.viewbarLayers.push(new_layer);
    this.setState(state);
  }

  handleItemClick(data) {
    let found = false;
    let foundIdx;
    let newStateLayers = cloneDeep(this.state.layers);
    let newViewbarLayers = cloneDeep(this.state.viewbarLayers);  

    newStateLayers.forEach((lyr, index) => {
      if (data.id === lyr.id){
        found = true;
        foundIdx = index;
      }
    });

    if (!found){
      newStateLayers = newStateLayers.concat([data]);
    }

    else {

      newStateLayers[foundIdx].isToggledOn = !this.state.layers[foundIdx].isToggledOn;

      //rearrange the layers array so display order matches clicked order
      moveWithinArray(newStateLayers, foundIdx, newStateLayers.length - 1);
    }

    newViewbarLayers.forEach((lyr, index) => {
      if (data.id === lyr.id){
        newViewbarLayers[index].isToggledOn = !this.state.viewbarLayers[index].isToggledOn;
      }
    });  

    newStateLayers = this.calculateDisplayIndexes(newStateLayers);
    newStateLayers = this.calculateRowLayers(newStateLayers);

    let newNumberOfLayersOn = newStateLayers.filter(i => i.isToggledOn).length;

    let newState = {'layers': newStateLayers,
                  'numberOfLayersOn': newNumberOfLayersOn,
                  'viewbarLayers': newViewbarLayers};

    this.setState(newState);
  }


 updateLayerDisplayIndexesAndRows(layers) {
  let newLayers = cloneDeep(this.state.layers);
  layers.forEach((lyr, index) => {
    var lyrIndex = findWithAttr(newLayers, "id", lyr.id);
    newLayers[lyrIndex].visibleIndex = index;
  });
  newLayers = this.calculateRowLayers(newLayers);

  this.setState({"layers": newLayers});
 }

 calculateDisplayIndexes(layers) {
    var visibleIndex = 0;
    let newLayers = layers.map(function(lyr){
      if (lyr.isToggledOn) {
        lyr.visibleIndex = visibleIndex;
        visibleIndex ++;
      }

      return lyr;
    });
    return newLayers;
  }
  
calculateRowLayers(layers) {
  let visibleLayers = layers.filter(i => i.isToggledOn);
  let numberOfLayersOn = visibleLayers.length;
  visibleLayers.sort(function(a,b){
    return a.visibleIndex - b.visibleIndex;
  })

  switch(numberOfLayersOn){
    case 1:
    case 2:
    case 3:
      visibleLayers.forEach(i => i.row = "row1");
      break;
    case 4:
      visibleLayers.slice(0,2).forEach(i => i.row = "row1");
      visibleLayers.slice(2).forEach(i => i.row = "row2");
      break;
    case 5:
    case 6:
      visibleLayers.slice(0,3).forEach(i => i.row = "row1");
      visibleLayers.slice(3).forEach(i => i.row = "row2");
      break;
    case 7:
      visibleLayers.slice(0,4).forEach(i => i.row = "row1");
      visibleLayers.slice(4).forEach(i => i.row = "row2");
      break;
    case 8:
    case 9:
      visibleLayers.slice(0,3).forEach(i => i.row = "row1");
      visibleLayers.slice(3,6).forEach(i => i.row = "row2");
      visibleLayers.slice(6).forEach(i => i.row = "row3");
      break;
    
    default:
      break;
  }
  return visibleLayers;
}

  render() {

    return (

      <Fullscreen
          enabled={this.state.isFullscreenEnabled}
          onChange={isFullscreenEnabled => this.setState({isFullscreenEnabled})}>

        <div id="modalRoot"></div>
     
        <div className="App">
          <Modal isOpen={this.state.modalIsOpen} 
              openModal={this.openModal}
              closeModal={this.closeModal}
              modalSubmit={this.modalSubmit}
              modalContent={this.state.modalContent}
              modalType={this.state.modalType}
              modalOptions={this.state.modalOptions}
              rebuildTooltip={this.rebuildTooltip}
             
              />

          <header className="App-header">
            {this.Config.siteTitle}
          </header>

          <Tooltip rebuildTooltip={this.state.rebuildTooltip}
                   resetRebuildTooltip={this.rebuildTooltip} />
         
          {this.state.numberOfLayersOn === 0 && 
            <div className='no-maps'>
              <p>
                {this.Config.welcomeText}
              </p>
            </div>
          }

          {this.state.numberOfLayersOn > 0 && 
            <MapsContainer layers={this.state.layers} 
                           overlays={this.state.overlays}
                           mapCenter={this.mapCenter}
                           geocodeResult={this.state.geocode}
                           labelLayerOn={this.state.labelLayerOn}
                           numberOfLayersOn={this.state.numberOfLayersOn}
                           updateLayerDisplayIndexesAndRows={this.updateLayerDisplayIndexesAndRows}
                           />
          }

          {this.state.numberOfLayersOn > 0 && 
            <UtilityBar transmitGeocode={this.transmitGeocode} 
                        toggleFullscreen={this.toggleFullscreen}
                        toggleLabels={this.toggleLabels}
                        toggleViewbarVisibility={this.toggleViewbarVisibility}
                        labelLayerOn={this.state.labelLayerOn}
                        isFullscreenEnabled={this.state.isFullscreenEnabled}
                        overlays={this.state.overlays}
                        viewbarLayers={this.state.viewbarLayers}
                        addOverlay={this.addOverlay}
                        deleteOverlay={this.deleteOverlay}
                        openModal={this.openModal}
                        closeModal={this.closeModal}
                        viewbarVisible={this.state.viewbarVisible}
                        />
          }

          {this.state.viewbarVisible &&
            <ViewBar onItemClick={this.handleItemClick}
                     numberOfLayersOn={this.state.numberOfLayersOn}
                     toggleModal={this.toggleModal}
                     openModal={this.openModal}
                     closeModal={this.closeModal}
                     viewbarLayers={this.state.viewbarLayers}
                     newLayer={this.state.newLayer} 
                     addLayer={this.addLayer}
                     rebuildTooltip={this.rebuildTooltip}
                     />
          }
        </div>
      </Fullscreen>
    );
  }
}

export default App;
