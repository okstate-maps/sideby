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
          title='Toggle Fullscreen Mode'>
          <FontAwesomeIcon 
              icon={this.props.isFullscreenEnabled ? 'compress' : 'expand'} 
              size='2x'
              />
        </button>

    );
  }
}

export default FullscreenToggle;
