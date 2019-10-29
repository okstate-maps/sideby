import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerGroup, faPlus } from '@fortawesome/free-solid-svg-icons';
import TooltipIcon from './TooltipIcon';
import Config from './Config';


class AddOverlay extends Component {

  constructor(props) {
    super(props);
    library.add(faLayerGroup);
    library.add(faPlus);
    this.onClick = this.onClick.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.modalType = 'AddOverlay';
  }
 
  onBlur(e) {
    let submittedUrl = e.target.value;
    
  }

  onClick(e) {
    let currentOverlays = this.props.overlays;

    let modalContent = 
    <>
        {currentOverlays.length > 0 && 
            <table className='table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>URL</th>
                    </tr>
                </thead>
                <tbody>
                    {currentOverlays.map((o, i) => 

                    <tr>
                        <td>{o.display_name}</td>
                        <td>o.url</td>
                    </tr>

                        )}
                </tbody>
            </table>
        }

        <div className='inputGroup'>
            <label className='textInputLabel' htmlFor='addOverlayUrl'>Url: </label>
            <textarea
                id='addOverlayUrl' 
                name='addOverlayUrl' 
                placeholder='Enter the URL to your map/data.'
                onBlur={this.onBlur}></textarea>
            <TooltipIcon tooltipName={Config.tooltips.AddOverlayUrl} />
        </div>
        <div className="radioGroup">
            <label className="radioGroupLabel" htmlFor="overlayType">Type</label>
                <div className="inputGroup">
                    <input 
                        name="overlayType" 
                        id="overlay-input-TileLayer" 
                        type="radio" 
                        value="TileLayer" />
                    <label htmlFor="overlay-input-TileLayer">TileLayer</label>
                    <TooltipIcon tooltipName={Config.tooltips.AddOverlayTileLayer}/>
                </div>
                
                <div className="inputGroup">
                    <input 
                        name="overlayType" 
                        id="overlay-input-WMSTileLayer" 
                        type="radio" 
                        value="WMSTileLayer" />
                    <label htmlFor="overlay-input-WMSTileLayer">WMSTileLayer</label>
                </div>
                
                <div className="inputGroup">
                    <input 
                        name="overlayType" 
                        id="overlay-input-EsriTiledMapLayer" 
                        type="radio" 
                        value="EsriTiledMapLayer" />
                    <label htmlFor="overlay-input-EsriTiledMapLayer">EsriTiledMapLayer</label>
                </div>
                
                <div className="inputGroup">
                    <input 
                        name="overlayType" 
                        id="overlay-input-EsriDynamicMapLayer" 
                        type="radio" 
                        value="EsriDynamicMapLayer" />
                    <label htmlFor="overlay-input-EsriDynamicMapLayer">EsriDynamicMapLayer</label>
                </div>
                
                <div className="inputGroup">
                    <input 
                        name="overlayType" 
                        id="overlay-input-EsriFeatureLayer" 
                        type="radio" 
                        value="EsriFeatureLayer" />
                    <label htmlFor="overlay-input-EsriFeatureLayer">EsriFeatureLayer</label><br/>
                    <TooltipIcon tooltipName={Config.tooltips.AddOverlayEsriFeatureLayer} />
                </div>
        </div>
        
        <div className="inputGroup">
            <label className="textInputLabel" 
                htmlFor="overlay-input-displayName">
                Display Name: 
            </label>

            <input 
                name="overlayDisplayName" 
                id="overlay-input-displayName" 
                type="text"/>
        </div>
        </>
      this.props.openModal(this.modalType, modalContent);
  }

  render() {
    return (
        <button className='add-overlay'
            onClick={this.onClick} 
            name="Add Overlay"
            title="Add Overlay"
            id='add-overlay'>
            <span className='fa-layers fa-fw fa-2x'>
                <FontAwesomeIcon icon='layer-group' />
                <FontAwesomeIcon icon='plus' transform="shrink-9  up-4" color="red"/>
            </span>
        </button>
    );
  }
}

export default AddOverlay;
