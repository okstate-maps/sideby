import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';



import Config from './Config';
import 'leaflet.sync';

import './MapView.css';

//const { Map, TileLayer, Marker, Popup } = ReactLeaflet



class MapView extends Component {
  
  constructor(props, context) {
    super(props)
    this.mapboxToken = Config.mapboxToken;
    this.passUpRef = this.passUpRef.bind(this);
    this.syncMaps = this.syncMaps.bind(this);
    this.unsyncMaps = this.unsyncMaps.bind(this);
    this.invalidateMapSizes = this.invalidateMapSizes.bind(this);
  }

  passUpRef(id, ref, deleteRef) {
    this.props.passUpRef(id, ref, deleteRef);
  }
 
  invalidateMapSizes() {
    this.props.invalidateMapSizes();
  }

  unsyncMaps(ref_id) {
    this.props.unsyncMaps(ref_id);
  }

  syncMaps() {
    this.props.syncMaps();
  }

  render() {

    // Use ids from layers array to create list of urls
    const layers = this.props.layers;
    let filtered_layers = layers.filter(lyr => {
      if (lyr.isToggledOn){
        return true;
      }
      else {
        return false;
      }
    });

    if (filtered_layers.length === 0){

      return (<div className='no-maps'>
               <p>Welcome to Stillwater from the Air!</p>
               <p>
                With this website you can see how Stillwater and Oklahoma State University 
                have changed over the years.
               </p>
               <p>
                Click or tap on one of the years at the bottom of the screen. You
                can select up to 8 at a time. Click or tap it again to turn it off.
                </p>
             </div>
            );
    }

    else if (filtered_layers.length >= 1){
      
      let maps = filtered_layers.map( (layer, index) => {
          
          const draggableId = "draggable-"+ layer.id; 

          return (
              <Draggable className={'map'+ filtered_layers.length + ' p' + index}  
                      draggableId={draggableId} key={draggableId} index={index}>

                {(provided, snapshot) => (
                 <MapWrapper
                    layer={layer}
                    innerRef={provided.innerRef}
                    key={layer.id}
                    {/*numberLayers={filtered_layers.length}*/}
                    layerIndex={index}
                    provided={provided}
                    isDragging={snapshot.isDragging}
                    passUpRef={this.passUpRef}
                    mapRef={this.props.mapRef}
                    syncMaps={this.syncMaps}
                    unsyncMaps={this.unsyncMaps}
                    labelLayerOn={this.props.labelLayerOn}
                    invalidateMapSizes={this.invalidateMapSizes}
                    />
              )}

              </Draggable>
                
            )
          });
        return maps;
      
    }
  }
}

export default React.forwardRef((props, ref) => <MapView mapRef={ref} {...props} />);
