import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import './ScrollButton.css';

library.add(faAngleLeft);
library.add(faAngleRight);

class ScrollButton extends Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
 
  onClick(e) {
    this.props.onClick(this.props.direction);
  }

  render() {
    let arrow = this.props.direction === "left" ? "angle-left" : "angle-right";
    return (
      <div className={'ScrollButton ' + this.props.direction}
           onClick={this.onClick}>  
          <button><FontAwesomeIcon icon={arrow} size="lg"/></button>
      </div>
    );
  }
}

export default ScrollButton;

