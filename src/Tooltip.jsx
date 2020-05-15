import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import './Tooltip.css';


class Tooltip extends Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  resetRebuildTooltip() {
    this.props.resetRebuildTooltip(false);
  }

  componentDidUpdate(prevProps, prevState){
    if (this.props.rebuildTooltip === true) {
      this.resetRebuildTooltip();
    }
      ReactTooltip.rebuild();
  }

  onChange() {
  }

  render() {
    return (
      <>
          <ReactTooltip 
              className="superHighZIndex" 
              effect="solid" 
              id="modal" 
              place="right"
              multiline={true}
              />
          <ReactTooltip effect="solid" id="home" />
      </>
    );
  }
}

export default Tooltip;
