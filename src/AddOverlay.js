import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare  } from '@fortawesome/free-solid-svg-icons';
import { isMobile } from './Util';
import AddOverlayForm from './AddOverlayForm';


class AddOverlay extends Component {

  constructor(props) {
    super(props);
    this.Config = window.sideby.Config;
    library.add(faPlusSquare);
    this.onClick = this.onClick.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.handleLayerTypeChange = this.handleLayerTypeChange.bind(this);
    this.modalType = 'AddOverlay';
    this.state = {layerTypeGuess: null};
  }
  
  handleLayerTypeChange(event) {
    console.log(event.target.value);
    this.setState({
      layerTypeGuess: event.target.value
    });
  }

  onBlur(e) {
    let typeREs = {
        TileLayer: /.*\{z\}.*\{x\}.*\{y\}.*/,
        WMSTileLayer: /.*wms.*/i,
        WMTSTileLayer: /.*wmts.*/i,
        EsriImageLayer: /.*arcgis.*ImageServer.*/,
        EsriFeatureLayer: /.*arcgis.*FeatureServer.*/, //though an individ layer from esri dynam map service can also act as a feature layer...
        EsriTiledMapLayer: /.*arcgis.*MapServer.*/, 
    };
    let submittedUrl = e.target.value;
    let newType = null;
    
    Object.entries(typeREs).forEach((lyrTypeRE) => {
            if (lyrTypeRE[1].test(submittedUrl)) {
                newType = lyrTypeRE[0];
            }
        }
    )
    
    this.setState({layerTypeGuess: newType})

  }

  onClick(e) {
    let modalContent = <AddOverlayForm onBlur={this.onBlur} {...this.props} />
    this.props.openModal(this.modalType, modalContent);
  }

  render() {
    return (
        <button className='add-overlay'
            onClick={this.onClick} 
            name="Add Overlay"
            id='add-overlay'
            data-tip='Add an overlay layer' 
            data-for='modal' 
            data-event='mouseover'
            data-delay-show='900'
            data-place='top'
            data-event-off='mouseout'
            data-tip-disable={isMobile} 
            >
            <FontAwesomeIcon icon='plus-square' size="2x"/>
        </button>
    );
  }
}

export default AddOverlay;
