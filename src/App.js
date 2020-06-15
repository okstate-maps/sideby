import React, { Component } from 'react';
import Fullscreen from 'react-fullscreen-crossbrowser';
import { cloneDeep } from 'lodash';
import shortid from 'shortid';
import ReactTooltip from 'react-tooltip';
import { findWithAttr, moveWithinArray } from './Util';
import UtilityBar from './UtilityBar';
import ViewBar from './ViewBar';
import Modal from './Modal';
import Tooltip from './Tooltip';
import MapsContainer from './MapsContainer';
import { LayersInfoNYC, LayersInfoStillwater} from './LayersInfoDemo';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.Config = window.sideby.Config;

    this.addLayer = this.addLayer.bind(this);
    this.addOverlay = this.addOverlay.bind(this);
    this.calculateDisplayIndexes = this.calculateDisplayIndexes.bind(this);
    this.calculateRowLayers = this.calculateRowLayers.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.deleteLayer = this.deleteLayer.bind(this);
    this.deleteOverlay = this.deleteOverlay.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.openModal = this.openModal.bind(this);
    this.rebuildTooltip = this.rebuildTooltip.bind(this);
    this.transmitGeocode = this.transmitGeocode.bind(this);
    this.toggleDeleteMode = this.toggleDeleteMode.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.toggleInvalidateMapSizes = this.toggleInvalidateMapSizes.bind(this);
    this.toggleLabels = this.toggleLabels.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleViewbarVisibility = this.toggleViewbarVisibility.bind(this);
    this.updateLayerDisplayIndexesAndRows = this.updateLayerDisplayIndexesAndRows.bind(this);
    
    this.state = {'layers':[],
                  'overlays': window.sideby.OverlaysInfo || [],
                  'numberOfLayersOn': 0, 
                  'geocodeResult': {},
                  'labelLayerOn': true,
                  'rebuildTooltip': false,
                  'modalIsOpen': false,
                  'modalContent': '',
                  'viewbarVisible': true,
                  'deleteModeActive': false,
                  'invalidateMapSizes': false
                };
    
    /*
    All of the window.location.hash stuff is just a hacky way
    to create shortcuts 
    */
    if (window.location.hash === '#builder') {
      window.sideby.LayersInfo = [];
    }

    if (window.location.hash === '#stw') {
      this.Config.siteTitle= 'Stillwater from the Air';
      this.Config.welcomeText = 'It\'s Stillwater!';
      this.Config.themeBackgroundColor = '#f60';
      window.sideby.LayersInfo = LayersInfoStillwater;
    }

    if (window.location.hash === '#nyc') {
      this.Config.siteTitle= 'New York City through the years';
      this.Config.welcomeText = 'Using aerial photos from NYC Then & Now, click the buttons below to see how the city has changed over the last 100 years.'
      window.sideby.LayersInfo = LayersInfoNYC;
      this.state.overlays = [  {
        'layer_type': 'TileLayer',
        'url': 'https://maps.nyc.gov/xyz/1.0.0/carto/basemap/{z}/{x}/{y}.jpg',
        'id': 'asfasdfasfadfadf',
        'thumbnail_path': 'nyc.jpg',
        'display_name': 'basemap',
        'start_bounds': '-74.447928,40.442617,-73.512717,40.988043',
        'format': 'image/jpeg',
        'is_basemap': true
      }];
    }

    //set theming options
    document.title = this.Config.siteTitle;
    let globalStyle = document.documentElement.style;
    globalStyle.setProperty('--header-color', this.Config.themeHeaderColor);
    globalStyle.setProperty('--header-font-family', this.Config.themeHeaderFontFamily);
    globalStyle.setProperty('--label-color', this.Config.themeLabelColor);
    globalStyle.setProperty('--text-primary-color', this.Config.themeTextPrimaryColor);
    globalStyle.setProperty('--text-tertiary-color', this.Config.themeTextTertiaryColor);
    globalStyle.setProperty('--background-color', this.Config.themeBackgroundColor);

    //for the initial app load, set state using LayersInfo
    let viewbarLayers = window.sideby.LayersInfo.map(item => 
        ({...item, isToggledOn: false, id: shortid.generate()})
      );
    this.state.viewbarLayers =  viewbarLayers.sort( (a, b) => {
      return b.sortVal - a.sortVal
    });

  }

  addLayer(data) {
    let new_layer = data,
      id = shortid.generate(), 
      maxZoom = 20;

    new_layer.id = id;
    new_layer.maxZoom = maxZoom;
    
    let state = {'viewbarLayers': this.state.viewbarLayers};
    state.viewbarLayers.push(new_layer);
    this.setState(state);
  }

  addOverlay(data) {
    let overlays = cloneDeep(this.state.overlays);  
    var new_layer = data;
    new_layer.isOverlay = true;
    new_layer.id = shortid.generate();
    new_layer.interactive = false;
    overlays.push(new_layer);
    this.setState({'overlays': overlays});
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
        visibleLayers.forEach(i => i.row = 'row1');
        break;
      case 4:
        visibleLayers.slice(0,2).forEach(i => i.row = 'row1');
        visibleLayers.slice(2).forEach(i => i.row = 'row2');
        break;
      case 5:
      case 6:
        visibleLayers.slice(0,3).forEach(i => i.row = 'row1');
        visibleLayers.slice(3).forEach(i => i.row = 'row2');
        break;
      case 7:
        visibleLayers.slice(0,4).forEach(i => i.row = 'row1');
        visibleLayers.slice(4).forEach(i => i.row = 'row2');
        break;
      case 8:
      case 9:
        visibleLayers.slice(0,3).forEach(i => i.row = 'row1');
        visibleLayers.slice(3,6).forEach(i => i.row = 'row2');
        visibleLayers.slice(6).forEach(i => i.row = 'row3');
        break;
      
      default:
        break;
    }
    return visibleLayers;
  }

  closeModal() {
    this.toggleModal(false);
    ReactTooltip.hide(); //in case any tooltips are showing
  }


  deleteOverlay(obj) {
    let id = obj.currentTarget.dataset.overlayId;
    document.getElementById(id).style.display = 'none';
    let overlays = cloneDeep(this.state.overlays);
    let matchIndex = findWithAttr(overlays, 'id', id);
    overlays.splice(matchIndex, 1);
    this.setState({'overlays': overlays});
  }

  deleteLayer(id) {
    let viewbarLayers = cloneDeep(this.state.viewbarLayers);
    let matchIndex = findWithAttr(viewbarLayers, 'id', id);
    viewbarLayers.splice(matchIndex, 1);
    this.setState({'viewbarLayers': viewbarLayers});
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

  /*
  Function to open modal.
    modalType (string): Not really used anymore, should just remove
    modalContent (jsx): A Formik form in JSX
    modalOptions (object): really not used anymore, should remove as well.  
  */
  openModal(modalType, modalContent, modalOptions){
    this.setState({
      modalType: modalType,
      modalContent: modalContent,
      modalOptions: modalOptions
    });
    this.toggleModal(true);
  }

  rebuildTooltip(bool) {
    this.setState({'rebuildTooltip': bool});
  }

  /*
    Toggle delete mode for the comparison layer bar.
  */
  toggleDeleteMode(bool) {
    this.setState({deleteModeActive: bool});
    this.forceUpdate();
  }

  /*
    Toggle fullscreen mode. Used by FullscreenToggle component on the UtilityBar
  */
  toggleFullscreen() {
    let current_val = this.state.isFullscreenEnabled;
    this.setState({isFullscreenEnabled: !current_val});
  }

  /*
    Toggle that triggers invalidation of map sizes. Only use outside of 
    MapContainer component is the hide/show viewbar button.
  */
  toggleInvalidateMapSizes(bool) {
    this.setState({invalidateMapSizes: bool});
  }

  /*
    Toggle map labels
  */
  toggleLabels() {
    let curr = this.state.labelLayerOn;
    this.setState({'labelLayerOn': !curr});
  }

  /*
    Toggle for handling modal visibility state
  */
  toggleModal(bool) {
    this.setState({'modalIsOpen': bool});
  }

  /*
    Toggle for handling layer comparison viewbar state
  */
  toggleViewbarVisibility() {
    let current_val = this.state.viewbarVisible;
    this.setState({viewbarVisible: !current_val});
    this.toggleInvalidateMapSizes(true);
  }

  /*
    Function that is used to move the response received by 
    the Geocoder component from the Geocoder, up to the App,
    and then back down to the MapsContainer
  */
  transmitGeocode(geocode) {
    this.setState({'geocode': geocode});
  }

  updateLayerDisplayIndexesAndRows(layers) {
    let newLayers = cloneDeep(this.state.layers);
    layers.forEach((lyr, index) => {
      var lyrIndex = findWithAttr(newLayers, 'id', lyr.id);
      newLayers[lyrIndex].visibleIndex = index;
    });
    newLayers = this.calculateRowLayers(newLayers);
    this.setState({'layers': newLayers});
  }

  render() {

    return (

      <Fullscreen
          enabled={this.state.isFullscreenEnabled}
          onChange={isFullscreenEnabled => 
                    this.setState({isFullscreenEnabled})}>

        <div id='modalRoot'></div>
     
        <div className='App'>

          <Modal closeModal={this.closeModal}
              isOpen={this.state.modalIsOpen} 
              modalContent={this.state.modalContent}
              modalOptions={this.state.modalOptions}
              modalSubmit={this.modalSubmit}
              modalType={this.state.modalType}
              openModal={this.openModal}
              rebuildTooltip={this.rebuildTooltip} />

          <header className='App-header'>
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
            <MapsContainer geocodeResult={this.state.geocode}
                           invalidateMapSizes={this.state.invalidateMapSizes}
                           labelLayerOn={this.state.labelLayerOn}
                           layers={this.state.layers} 
                           mapCenter={this.mapCenter}
                           numberOfLayersOn={this.state.numberOfLayersOn}
                           overlays={this.state.overlays}
                           toggleInvalidateMapSizes={this.toggleInvalidateMapSizes}
                           updateLayerDisplayIndexesAndRows={this.updateLayerDisplayIndexesAndRows}
                           />
          }

          {this.state.numberOfLayersOn > 0 && 
            <UtilityBar addOverlay={this.addOverlay}
                        closeModal={this.closeModal}
                        deleteOverlay={this.deleteOverlay}
                        isFullscreenEnabled={this.state.isFullscreenEnabled}
                        labelLayerOn={this.state.labelLayerOn}
                        openModal={this.openModal}
                        overlays={this.state.overlays}
                        toggleFullscreen={this.toggleFullscreen}
                        toggleLabels={this.toggleLabels}
                        toggleViewbarVisibility={this.toggleViewbarVisibility}
                        transmitGeocode={this.transmitGeocode} 
                        viewbarLayers={this.state.viewbarLayers}
                        viewbarVisible={this.state.viewbarVisible}
                        />
          }

          {this.state.viewbarVisible &&
            <ViewBar addLayer={this.addLayer}
                     closeModal={this.closeModal}
                     deleteLayer={this.deleteLayer}
                     deleteModeActive={this.state.deleteModeActive}
                     newLayer={this.state.newLayer} 
                     numberOfLayersOn={this.state.numberOfLayersOn}
                     onItemClick={this.handleItemClick}
                     openModal={this.openModal}
                     rebuildTooltip={this.rebuildTooltip}
                     toggleDeleteMode={this.toggleDeleteMode}
                     toggleModal={this.toggleModal}
                     viewbarLayers={this.state.viewbarLayers}
                     />
          }
        </div>
      </Fullscreen>
    );
  }
}

export default App;
