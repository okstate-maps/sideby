import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faCompress } from '@fortawesome/free-solid-svg-icons';

library.add(faExpand);
library.add(faCompress);

class FullscreenToggle extends Component {

  render() {
    return (
      <div>
        <button onClick={() => this.props.toggleFullscreen()}>
          <FontAwesomeIcon 
              icon={this.props.isFullscreenEnabled ? "compress" : "expand"} 
              size="2x"
              />
        </button>
      </div>
    );
  }
}

export default FullscreenToggle;
