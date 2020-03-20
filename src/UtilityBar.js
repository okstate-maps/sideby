import React, { Component } from 'react';
import Geocoder from './Geocoder';
import AddOverlay from './AddOverlay';
import ManageOverlays from './ManageOverlays';
import Settings from './Settings';
import FullscreenToggle from './FullscreenToggle';
import './UtilityBar.css';
import './UtilityBarButton.css';


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
        <AddOverlay 
            numberOfLayersOn={this.props.numberOfLayersOn} 
            addOverlay={this.props.addOverlay}
            openModal={this.props.openModal} 
            closeModal={this.props.closeModal} 
            />
        {this.props.overlays.length > 0 &&
          <ManageOverlays 
              overlays={this.props.overlays}
              openModal={this.props.openModal}
              deleteOverlay={this.props.deleteOverlay} />
          }
        <FullscreenToggle toggleFullscreen={this.props.toggleFullscreen} 
                          isFullscreenEnabled={this.props.isFullscreenEnabled} />
        <Settings 
          openModal={this.props.openModal}
          closeModal={this.props.closeModal}
          labelLayerOn={this.props.labelLayerOn}
          toggleLabels={this.props.toggleLabels}
          viewbarLayers={this.props.viewbarLayers}
                                        />
        
      </div>
    );
  }
}

export default UtilityBar;

