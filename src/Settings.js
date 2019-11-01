import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import MapLabelsToggle from './MapLabelsToggle';


class Settings extends Component {

  constructor(props) {
    super(props);
    library.add(faCog);
    this.onClick = this.onClick.bind(this);
  }
 
  onClick(e) {
    let modalContent =  
      <>
        <MapLabelsToggle labelLayerOn={this.props.labelLayerOn}
                         toggleLabels={this.props.toggleLabels} />
      </>

    this.props.openModal("Settings", modalContent, {noSubmit: true});
  }

  render() {
    return (
        <button className='settings-button' 
            onClick={this.onClick}
            name='Settings'
            title='Settings' 
            id='settings-button'>
          <div className="icon-label">
             <FontAwesomeIcon icon='cog' size="2x"/>
          </div>

        </button>
      );
  }
}

export default Settings;
