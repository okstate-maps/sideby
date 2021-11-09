import React, { Component } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
// import * as L from 'leaflet';
import { isEqual } from 'lodash';
import RowContainer from './RowContainer';
import { findWithAttr, moveWithinArray, compareArrays } from './Util';

class MapsContainer extends Component {

  constructor(props) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.setMapRef = this.setMapRef.bind(this);
    this.syncMaps = this.syncMaps.bind(this);
    this.unsyncMaps = this.unsyncMaps.bind(this);
    this.invalidateMapSizes = this.invalidateMapSizes.bind(this);
    this.handleGeocode = this.handleGeocode.bind(this);
    this.clearGeocode = this.clearGeocode.bind(this);
    this.state = {'mapRefs': {}, 'mapInstances': {}}
    this.passUpMapInstance = this.passUpMapInstance.bind(this);

  }

  passUpMapInstance(id, instance, deleteInstance) {
    let mapInstances = {'mapInstances': this.state.mapInstances};

    if (deleteInstance) {
      this.unsyncMaps(id);
      delete(mapInstances.mapInstances[id]);
  
    }
    else {
      mapInstances.mapInstances[id] = instance;
      this.manageZoomControls();
      this.syncMaps();
    }

    this.setState(mapInstances);
    }

 onDragEnd(draggedLayer) {

    if (draggedLayer.destination === null) {
      return;
    }

    let allLayers = this.props.layers;
    let currentRow = draggedLayer.source.droppableId;  
    let destRow = draggedLayer.destination.droppableId; 
    let currentLayerIndex, destinationIndex;
    
    if (currentRow === 'row2') {
      currentLayerIndex = allLayers.filter(i => i.row === 'row1').length + draggedLayer.source.index;
    }
    else if (currentRow === 'row3') {
      currentLayerIndex = allLayers.filter(i => i.row === 'row1').length + 
                          allLayers.filter(i => i.row === 'row2').length +
                          draggedLayer.source.index;
    }
    else {
      currentLayerIndex = draggedLayer.source.index;
    }

    if (destRow === 'row2') {
      destinationIndex = allLayers.filter(i => i.row === 'row1').length + 
                          draggedLayer.destination.index;
    }
    else if (destRow === 'row3') {
      destinationIndex = allLayers.filter(i => i.row === 'row1').length + 
                          allLayers.filter(i => i.row === 'row2').length +
                          draggedLayer.destination.index;
    }
    else {
      destinationIndex = draggedLayer.destination.index;
    }

    let allTurnedOnLayers = allLayers.filter(i => i.isToggledOn);
    
    moveWithinArray(allTurnedOnLayers, currentLayerIndex, destinationIndex);
 	  
    this.props.updateLayerDisplayIndexesAndRows(allTurnedOnLayers);
  
  }


  manageZoomControls() { 
    let mapInstances = this.state.mapInstances;
    let layers = this.props.layers;
    var map, lyr, zoomControlNeeded;

    for (let i in mapInstances){ 
    
      map = mapInstances[i];
      lyr = layers[findWithAttr(layers, 'id', i)];
      
      if (lyr){
      zoomControlNeeded = lyr.visibleIndex === 0 ? true : false;
      
      if (zoomControlNeeded){
          
          map.removeControl(map.zoomControl);
          map.addControl(map.zoomControl);
          
      }

      else {
        map.removeControl(map.zoomControl);

      }
    }
    }

  }

  invalidateMapSizes() {
    let mapInstances = this.state.mapInstances;
    for (let i in mapInstances){ 
      mapInstances[i].invalidateSize();
    }
  }

  unsyncMaps(id) {
    let mapInstances = this.state.mapInstances;
    console.log(mapInstances);
    for (var i in mapInstances){
      if (i !== id && mapInstances[id]){
          mapInstances[id].unsync(mapInstances[i]);
          mapInstances[i].unsync(mapInstances[id]);
      }
    }
  }

  syncMaps() {
    let mapInstances = this.state.mapInstances;
    for (var i in mapInstances){
      for (var j in mapInstances){
        if (i !== j && !mapInstances[i].isSynced(mapInstances[j])){
          mapInstances[i].sync(
            mapInstances[j], {syncCursor: true}
          );           
        }
      }
    }
  }

  clearGeocode() {
  	this.setState({'geocodeResult': false});
  }

  handleGeocode(geocodeResult){
  	//maybe move this to mapwrapper? other than setting state w/ center that is
  	let randomMap = Object.entries(this.state.mapInstances)[0][1];
    let bbox = this.props.geocodeResult.geocode.bbox;
    let center = this.props.geocodeResult.geocode.center;

    if (bbox._northEast.lat !== bbox._southWest.lat){
      randomMap.fitBounds(bbox);
    }

    else {
      randomMap.setView(center, 15);
    }
    this.setState({'geocodeResult': center});
    setTimeout(this.clearGeocode, 2000);

  }

  componentDidUpdate(prevProps, prevState){
    let prevLyrs = prevProps.layers;
    let lyrs = this.props.layers;

    if (prevLyrs.filter(i => i.isToggledOn).length !== 
         lyrs.filter(i => i.isToggledOn).length) 
    {
      this.invalidateMapSizes();
    }

    else if (!compareArrays(prevLyrs, lyrs))
    {
      setTimeout(this.invalidateMapSizes, 400);
    }
    if (prevLyrs.length === lyrs.length && !isEqual(prevLyrs.map(lyr => lyr.display_name+lyr.visibleIndex.toString()),
          lyrs.map(lyr => lyr.display_name+lyr.visibleIndex.toString()))){
            this.manageZoomControls();
          }

    if (prevProps.geocodeResult !== this.props.geocodeResult) {
      this.handleGeocode(this.props.geocodeResult);
    }

    //this prop is used by non-map componenets upstream (well, for now, only HideViewbar)
    if (this.props.invalidateMapSizes) {
      this.invalidateMapSizes();
      this.props.toggleInvalidateMapSizes(false);
    }

  }

  render() {
  	let layers = this.props.layers.filter(lyr => lyr.isToggledOn);
  	let numberRows = [];
    layers.forEach(lyr => {
    	numberRows.push(lyr.row);
    });
    numberRows = new Set(numberRows);
    numberRows = [...numberRows];

    let row1Layers = layers.filter(i => i.row === 'row1');
    row1Layers.sort((a, b) => a.visibleIndex - b.visibleIndex);
    let row2Layers = layers.filter(i => i.row === 'row2');
    row2Layers.sort((a, b) => a.visibleIndex - b.visibleIndex);
    let row3Layers = layers.filter(i => i.row === 'row3');
    row2Layers.sort((a, b) => a.visibleIndex - b.visibleIndex);
    

    let rows = numberRows.map( (val, index) => { 
      return (
        <Droppable droppableId={val} key={val} direction='horizontal'>
          {(provided, snapshot) => (
            <RowContainer className={'Row ' + val + (numberRows.length === 2 ? ' two-rows' : numberRows.length=== 3 ? ' three-rows': '')} 
                  provided={provided}
                  snapshot={snapshot}
                  passUpRef={this.passUpRef}
                  passUpMapInstance={this.passUpMapInstance}
				          geocodeResult={this.state.geocodeResult}
				          clearGeocode={this.clearGeocode}
                  mapRef={this.setMapRef} 
                  innerRef={provided.innerRef}
                  syncMaps={this.syncMaps}
                  labelLayerOn={this.props.labelLayerOn}
                  unsyncMaps={this.unsyncMaps}
                  invalidateMapSizes={this.invalidateMapSizes}
                  overlays={this.props.overlays}
                  layers={val === 'row1' ? row1Layers : val === 'row2' ? row2Layers : row3Layers}>
            </RowContainer>
          )}  
        </Droppable>
      )
    });

    return (
      <div id='maps'>
            <DragDropContext onDragEnd={this.onDragEnd}>
              {rows}
            </DragDropContext>
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => <MapsContainer mapRef={ref} {...props} />);;
