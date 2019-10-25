import React, { Component } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import * as L from 'leaflet';
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
    this.state = {"mapRefs": {}}
    this.passUpRef = this.passUpRef.bind(this);
  }

  passUpRef(id, ref, deleteRef) {
    let mapRefs = {"mapRefs": this.state.mapRefs};

    if (deleteRef) {
      this.unsyncMaps(id);
      delete(mapRefs.mapRefs[id]);
      this.setState(mapRefs);
    }
    else {
      this.syncMaps();
    }
    this.invalidateMapSizes();
  }

 setMapRef(DOMNode) {
    let mapRefs = {"mapRefs": this.state.mapRefs};

    if (DOMNode) {
      mapRefs.mapRefs[DOMNode.container.id] = DOMNode;
      this.setState(mapRefs);
    }
  }

 onDragEnd(draggedLayer) {

    if (draggedLayer.destination === null) {
      return;
    }

    let allLayers = this.props.layers;
    let currentRow = draggedLayer.source.droppableId;  
    let destRow = draggedLayer.destination.droppableId; 
    let currentLayerIndex, destinationIndex;
    
    if (currentRow === "row2") {
      currentLayerIndex = allLayers.filter(i => i.row === "row1").length + draggedLayer.source.index;
    }
    else {
      currentLayerIndex = draggedLayer.source.index;
    }

    
    if (destRow === "row2") {
      destinationIndex = allLayers.filter(i => i.row === "row1").length + draggedLayer.destination.index;
    }
    else {
      destinationIndex = draggedLayer.destination.index;
    }

    let allTurnedOnLayers = allLayers.filter(i => i.isToggledOn);
    
    moveWithinArray(allTurnedOnLayers, currentLayerIndex, destinationIndex);
 	  
    this.props.updateLayerDisplayIndexesAndRows(allTurnedOnLayers);
  
  }


  manageZoomControls() { 
    let mapRefs = this.state.mapRefs;
    let layers = this.props.layers;
    var map, lyr, zoomControlPresent;

    for (let i in mapRefs){ 
    
      map = mapRefs[i].leafletElement;
      lyr = layers[findWithAttr(layers, "id", i)];
      zoomControlPresent = lyr.visibleIndex === 0 ? true : false;
      
      if (zoomControlPresent && !map.zoomControlAdded){
          console.log(lyr.display_name +" needs a zoom control ADDED");
          map.addControl(new L.control.zoom());
          map.zoomControlAdded = true;
      }

      else {
        
        if (map.zoomControlAdded) {
          map.removeControl(map.zoomControl);
        }

        map.zoomControlAdded = false;
      }
    }

  }

  invalidateMapSizes() {
    let mapRefs = this.state.mapRefs;
    for (let i in mapRefs){ 
      mapRefs[i].leafletElement.invalidateSize();
    }
  }

  unsyncMaps(ref_id) {
    let mapRefs = this.state.mapRefs;
    for (var i in mapRefs){
      if (i !== ref_id && mapRefs[ref_id]){
          mapRefs[ref_id].leafletElement.unsync(mapRefs[i].leafletElement);
          mapRefs[i].leafletElement.unsync(mapRefs[ref_id].leafletElement);
      }
    }
  }

  syncMaps() {
    let mapRefs = this.state.mapRefs;
    for (var i in mapRefs){
      for (var j in mapRefs){
        if (i !== j && !mapRefs[i].leafletElement.isSynced(mapRefs[j].leafletElement)){
          mapRefs[i].leafletElement.sync(
            mapRefs[j].leafletElement, {syncCursor: true}
          );           
        }
      }
    }
  }

  clearGeocode() {
  	this.setState({"geocodeResult": false});
  }

  handleGeocode(geocodeResult){
  	//maybe move this to mapwrapper? other than setting state w/ center that is
  	let randomMap = Object.entries(this.state.mapRefs)[0][1];
    let bbox = this.props.geocodeResult.geocode.bbox;
    let center = this.props.geocodeResult.geocode.center;

    if (bbox._northEast.lat !== bbox._southWest.lat){
      randomMap.leafletElement.fitBounds(bbox);
    }

    else {
      randomMap.leafletElement.setView(center, 15);
    }
    this.setState({"geocodeResult": center});
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
    console.log(prevLyrs.map(lyr => lyr.display_name+lyr.visibleIndex.toString()));
    console.log(lyrs.map(lyr => lyr.display_name+lyr.visibleIndex.toString()));
    if (prevLyrs.length === lyrs.length && !isEqual(prevLyrs.map(lyr => lyr.display_name+lyr.visibleIndex.toString()),
          lyrs.map(lyr => lyr.display_name+lyr.visibleIndex.toString()))){
            console.log("manage zooooom");
            this.manageZoomControls();
          }

    if (prevProps.geocodeResult !== this.props.geocodeResult) {
      this.handleGeocode(this.props.geocodeResult);
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

    let row1Layers = layers.filter(i => i.row === "row1");
    row1Layers.sort((a, b) => a.visibleIndex - b.visibleIndex);
    let row2Layers = layers.filter(i => i.row === "row2");
    row2Layers.sort((a, b) => a.visibleIndex - b.visibleIndex);
    

    let rows = numberRows.map( (val, index) => { 
      return (
        <Droppable droppableId={val} key={val} direction="horizontal">
          {(provided, snapshot) => (
            <RowContainer className={"Row " + val + (numberRows.length === 2 ? " two-rows" : "" )} 
                  provided={provided}
                  snapshot={snapshot}
                  passUpRef={this.passUpRef}
				          geocodeResult={this.state.geocodeResult}
				          clearGeocode={this.clearGeocode}
                  mapRef={this.setMapRef} 
                  innerRef={provided.innerRef}
                  syncMaps={this.syncMaps}
                  labelLayerOn={this.props.labelLayerOn}
                  unsyncMaps={this.unsyncMaps}
                  invalidateMapSizes={this.invalidateMapSizes}
                  overlays={this.props.overlays}
                  layers={val === "row1" ? row1Layers : row2Layers}>
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
