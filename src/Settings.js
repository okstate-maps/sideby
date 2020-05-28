import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import SettingsForm from './SettingsForm';


class Settings extends Component {

  constructor(props) {
    super(props);
    library.add(faCog);
    this.onClick = this.onClick.bind(this);
  }
 
  onClick(e) {
    let modalContent = <SettingsForm {...this.props} />
    this.props.openModal("Settings", modalContent, {noSubmit: true});
  }

  render() {
    return (
        <button className='settings-button' 
            onClick={this.onClick}
            name='Settings'
            data-tip='Settings' 
            data-for='modal' 
            data-event='mouseover'
            data-delay-show='900'
            data-place='top'
            data-event-off='mouseout'
            id='settings-button'>
          <div className="icon-label">
             <FontAwesomeIcon icon='cog' size="2x"/>
          </div>
        </button>
      );
  }
}

export default Settings;
