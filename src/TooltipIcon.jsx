import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

class TooltipIcon extends Component {

  constructor(props) {
    super(props);
    library.add(faInfoCircle);
  }

  render() {
    return (
      <FontAwesomeIcon 
            data-tip={this.props.tooltipName} 
            data-for='modal' 
            data-event='click'
            icon='info-circle' />
    );
  }
}

export default TooltipIcon;
