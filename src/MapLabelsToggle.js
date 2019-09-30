import React, { Component } from 'react';

class MapLabelsToggle extends Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange() {
    console.log("fuck");
    this.props.toggleLabels();
  }
  render() {
    return (
      <div>
          <input defaultChecked={this.props.labelLayerOn} 
                 name="labelsCheckbox" 
                 id="labelsCheckbox" 
                 type="checkbox" 
                 onChange={this.onChange}>        
          </input>
          <label htmlFor="labelsCheckbox">Map&nbsp;Labels</label>
        </div>
    );
  }
}

export default MapLabelsToggle;
