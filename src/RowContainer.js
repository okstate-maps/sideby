import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import MapWrapper from './MapWrapper';
import './RowContainer.css';

class RowContainer extends React.Component {

  render() {
    const { provided, layers } = this.props;

  	let maps = layers.map((layer, index) => (
		<Draggable draggableId={'draggable-'+layer.id} 
				   key={'draggable-'+layer.id} 
				   index={index}>
		 	{(provided, snapshot) => (
		  	<MapWrapper
		        layer={layer}
		        overlays={this.props.overlays}
		        numberLayers={layers.length}
		        innerRef={provided.innerRef}
		        key={layer.id}
		        layerIndex={index}
		        provided={provided}
		        isDragging={snapshot.isDragging}
				passUpMapInstance={this.props.passUpMapInstance}
		        passUpRef={this.props.passUpRef}
		        mapRef={this.props.mapRef}
		        syncMaps={this.props.syncMaps}
		        geocodeResult={this.props.geocodeResult}
		        clearGeocode={this.props.clearGeocode}
		        unsyncMaps={this.props.unsyncMaps}
		        labelLayerOn={this.props.labelLayerOn}
		        invalidateMapSizes={this.props.invalidateMapSizes}
		        />
		 	)}
	  </Draggable>
    ));


    return (
    	
      <div className={this.props.className} 
      	   ref={provided.innerRef}
      	   {...provided.droppableProps}>
      	{maps}
        {provided.placeholder}
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => <RowContainer mapRef={ref} {...props} />);;