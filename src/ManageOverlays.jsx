import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup, faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import ExportLayersToJSONButton from './ExportLayersToJSONButton';


class ManageOverlays extends Component {

  constructor(props) {
    super(props);
    library.add(faLayerGroup);
    library.add(faTimesCircle);
    this.onClick = this.onClick.bind(this);
  }
 
  onClick(e) {
    let currentOverlays = this.props.overlays;
    let modalContent =  
      <>
          <table className='table'>
            <caption> Current Overlays</caption>
                <thead>
                    
                    <tr>
                        <th>Name</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {currentOverlays.map((o, i) => 

                    <tr id={o.id} key={o.id}>
                        <td>{o.display_name}</td>
                        <td>
                            <button data-overlay-id={o.id} onClick={this.props.deleteOverlay}>
                                <FontAwesomeIcon icon='times-circle' size="2x" />
                            </button>
                        </td>
                    </tr>

                        )}
                </tbody>
            </table>
            <ExportLayersToJSONButton layers={currentOverlays} />
            <br/>
            <button type="button" onClick={this.props.closeModal}>OK</button>
      </>

    this.props.openModal("ManageOverlays", modalContent, {noSubmit: true});
  }

  render() {
    return (
        <button className='ManageOverlays-button' 
            onClick={this.onClick}
            name='Manage Overlays'
            id='ManageOverlays-button'
            data-tip='Manage current overlays' 
            data-for='modal' 
            data-event='mouseover'
            data-delay-show='900'
            data-event-off='mouseout'
            data-place='top'
            >
          <div className="icon-label">
             <FontAwesomeIcon icon='layer-group' size="2x"/>
          </div>

        </button>
      );
  }
}

export default ManageOverlays;
