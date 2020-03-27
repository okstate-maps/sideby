import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';

library.add(faArrowDown);
library.add(faArrowUp);

class HideViewbarToggle extends Component {

  render() {
    return (
        <button onClick={() => this.props.toggleViewbarVisibility()}
          name='Hide view bar'
          title={this.props.viewbarVisible ? 'Hide Layer Selector' : "Show Layer Selector"}>
          <FontAwesomeIcon 
              icon={this.props.viewbarVisible ? 'arrow-down' : 'arrow-up'}
              size='2x'
              />
        </button>

    );
  }
}

export default HideViewbarToggle;
