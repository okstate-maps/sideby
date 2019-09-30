import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Geocoder from './Geocoder';
import AddOverlay from './AddOverlay';
import Settings from './Settings';
import FullscreenToggle from './FullscreenToggle';
import './UtilityBar.css';


class UtilityBar extends Component {

  constructor(props) {
    super(props);
    this.transmitGeocode = this.transmitGeocode.bind(this);
  }
 
  componentDidMount(){
  }

  transmitGeocode(geocode){
    this.props.transmitGeocode(geocode);
  }

  render() {
    return (
      <div id='UtilityBar' className={'UtilityBar'}>
        <Geocoder transmitGeocode={this.transmitGeocode} />
        <AddOverlay numberOfLayersOn={this.props.numberOfLayersOn} 
                    addOverlay={this.props.addOverlay}
                    overlays={this.props.overlays}
                    openModal={this.props.openModal} />
        <FullscreenToggle toggleFullscreen={this.props.toggleFullscreen} 
                          isFullscreenEnabled={this.props.isFullscreenEnabled} />
        <Settings 
          openModal={this.props.openModal}
          labelLayerOn={this.props.labelLayerOn}
          toggleLabels={this.props.toggleLabels}
                                        />
        
      </div>
    );
  }
}

export default UtilityBar;

