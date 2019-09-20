import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faCompress } from '@fortawesome/free-solid-svg-icons';
import Geocoder from './Geocoder';
import AddOverlay from './AddOverlay';
import './UtilityBar.css';

library.add(faExpand);
library.add(faCompress);

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
        <div>
          <input defaultChecked={this.props.labelLayerOn} 
                 name="labelsCheckbox" 
                 id="labelsCheckbox" 
                 type="checkbox" 
                 onChange={this.props.toggleLabels}>
            
          </input>
          <label htmlFor="labelsCheckbox">Map&nbsp;Labels</label>
        </div>
        <Geocoder transmitGeocode={this.transmitGeocode} />
        <AddOverlay numberOfLayersOn={this.props.numberOfLayersOn} 
                    addOverlay={this.props.addOverlay}
                    overlays={this.props.overlays}
                    openModal={this.props.openModal} />
        <div>
          <button onClick={() => this.props.toggleFullscreen()}>
            <FontAwesomeIcon icon={this.props.isFullscreenEnabled ? "compress" : "expand"} size="2x"/>
          </button>
        </div>
        
      </div>
    );
  }
}

export default UtilityBar;

