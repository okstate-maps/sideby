import React, { Component } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import RowContainer from './RowContainer';
import { moveWithinArray, compareArrays } from './Util';

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

  invalidateMapSizes() {
    let mapRefs = this.state.mapRefs;
    for (let i in mapRefs){ 
      mapRefs[i].leafletElement.invalidateSize();
    }
  }

  unsyncMaps(ref_id) {
    let mapRefs = this.state.mapRefs;
    for (let i in mapRefs){
      if (i !== ref_id && mapRefs[ref_id]){
          mapRefs[ref_id].leafletElement.unsync(mapRefs[i].leafletElement);
          mapRefs[i].leafletElement.unsync(mapRefs[ref_id].leafletElement);
      }
    }
  }

  syncMaps() {
    let mapRefs = this.state.mapRefs;
    for (let i in mapRefs){
      for (let j in mapRefs){
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

    randomMap.leafletElement.fitBounds(bbox);
    this.setState({"geocodeResult": center});
    setTimeout(this.clearGeocode, 2000);

  }

  componentDidUpdate(prevProps, prevState){

    if (prevProps.layers.filter(i => i.isToggledOn).length !== 
         this.props.layers.filter(i => i.isToggledOn).length) 
    {
      this.invalidateMapSizes();
    }

    else if (!compareArrays(prevProps.layers, this.props.layers))
    {
      setTimeout(this.invalidateMapSizes, 400);
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
