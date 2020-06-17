import React, { Component } from 'react';
import ClipboardJS from 'clipboard'; // https://github.com/zenorocha/clipboard.js/issues/535
import './FormComponents.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

class ExportLayersToJSONButton extends Component {

  constructor(props) {
    super(props);
    library.add(faCopy);
    this.onClick = this.onClick.bind(this);
    this.state = {
      showLayers: false
    }
    this.clipboard = new ClipboardJS('.copyButton', {
      container: document.getElementById('modalContainer')
    });

  }

  onClick() {
    this.setState({showLayers:!this.state.showLayers});
    
  }
  render() {
    return (
      <div className='exportLayersGroup'>
          <button name='exportLayersButton' 
                 type='button'
                 id='exportLayersButton' 
                 onClick={this.onClick}>        
                 Export Layers
          </button>
          <br/>
          {this.state.showLayers && 
            <>
            <textarea className='clipboardText' 
              id='clipboardText' 
              rows='10' 
              cols='50' 
              readOnly 
              value={JSON.stringify(this.props.layers, null, 2)}>
            </textarea>
            <button className='copyButton' 
              data-clipboard-target='#clipboardText'
              type='button'>
              <FontAwesomeIcon icon='copy'/>
            </button>
            </>
          }
          
        </div>
    );
  }
}

export default ExportLayersToJSONButton;
