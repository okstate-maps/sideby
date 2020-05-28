import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faCompress } from '@fortawesome/free-solid-svg-icons';

library.add(faExpand);
library.add(faCompress);

class FullscreenToggle extends Component {

  render() {
    return (
        <button onClick={() => this.props.toggleFullscreen()}
          name='Toggle Fullscreen Mode'
          data-tip={this.props.isFullscreenEnabled ? 'Exit Fullscreen Mode' : 'Enter Fullscreen Mode'} 
          data-for='modal' 
          data-event='mouseover'
          data-delay-show='800'
          data-place='top'
          data-event-off='mouseout'>
          
          <FontAwesomeIcon 
              icon={this.props.isFullscreenEnabled ? 'compress' : 'expand'} 
              size='2x'
              />
        </button>

    );
  }
}

export default FullscreenToggle;
