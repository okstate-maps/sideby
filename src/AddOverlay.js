import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare  } from '@fortawesome/free-solid-svg-icons';
import TooltipIcon from './TooltipIcon';
import Config from './Config';


class AddOverlay extends Component {

  constructor(props) {
    super(props);
    library.add(faPlusSquare);
    this.onClick = this.onClick.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.handleLayerTypeChange = this.handleLayerTypeChange.bind(this);
    this.modalType = 'AddOverlay';
    this.state = {layerTypeGuess: null};
  }
  
  handleLayerTypeChange(event) {
    console.log(event.target.value);
    this.setState({
      layerTypeGuess: event.target.value
    });
  }

  onBlur(e) {
    let typeREs = {
        TileLayer: /.*\{z\}.*\{x\}.*\{y\}.*/,
        WMSTileLayer: /.*wmts.*/i,
        EsriImageLayer: /.*arcgis.*ImageServer.*/,
        EsriFeatureLayer: /.*arcgis.*FeatureServer.*/,
        EsriTiledMapLayer: /.*arcgis.*MapServer.*/,
    };
    let submittedUrl = e.target.value;
    let newType = null;
    
    Object.entries(typeREs).forEach((lyrTypeRE) => {
            if (lyrTypeRE[1].test(submittedUrl)) {
                newType = lyrTypeRE[0];
            }
        }
    )
    
    this.setState({layerTypeGuess: newType})

  }

  onClick(e) {
    console.log(this.state);
    let modalContent = 
    <>

        <div className='inputGroup'>
            <label className='textInputLabel' htmlFor='addOverlayUrl'>Url: </label>
            <textarea
                id='addOverlayUrl' 
                name='addOverlayUrl' 
                placeholder='Enter the URL to your map/data.'
                onBlur={this.onBlur}></textarea>
            <TooltipIcon tooltipName={Config.tooltips.Url} />
        </div>
        <div className="radioGroup">
            <label className="radioGroupLabel" htmlFor="overlayType">Type</label>
                <div className="inputGroup">
                    <input 
                        name="overlayType" 
                        id="overlay-input-TileLayer" 
                        type="radio"
                        checked={this.state.layerTypeGuess === "TileLayer"}
                        onChange={this.handleLayerTypeChange}
                        value="TileLayer" />
                    <label htmlFor="overlay-input-TileLayer">TileLayer</label>
                    <TooltipIcon tooltipName={Config.tooltips.TileLayer}/>
                </div>
                
                <div className="inputGroup">
                    <input 
                        name="overlayType" 
                        id="overlay-input-WMSTileLayer" 
                        type="radio" 
                        checked={this.state.layerTypeGuess === "WMSTileLayer"} 
                        onChange={this.handleLayerTypeChange}
                        value="WMSTileLayer" />
                    <label htmlFor="overlay-input-WMSTileLayer">WMSTileLayer</label>
                </div>
                
                <div className="inputGroup">
                    <input 
                        name="overlayType" 
                        id="overlay-input-EsriTiledMapLayer" 
                        type="radio" 
                        checked={this.state.layerTypeGuess === "EsriTiledMapLayer"} 
                        onChange={this.handleLayerTypeChange}
                        value="EsriTiledMapLayer" />
                    <label htmlFor="overlay-input-EsriTiledMapLayer">EsriTiledMapLayer</label>
                </div>
                
                <div className="inputGroup">
                    <input 
                        name="overlayType" 
                        id="overlay-input-EsriDynamicMapLayer" 
                        type="radio" 
                        checked={this.state.layerTypeGuess === "EsriDynamicMapLayer"} 
                        onChange={this.handleLayerTypeChange}
                        value="EsriDynamicMapLayer" />
                    <label htmlFor="overlay-input-EsriDynamicMapLayer">EsriDynamicMapLayer</label>
                </div>
                
                <div className="inputGroup">
                    <input 
                        name="overlayType" 
                        id="overlay-input-EsriFeatureLayer" 
                        type="radio" 
                        checked={this.state.layerTypeGuess === "EsriFeatureLayer"} 
                        onChange={this.handleLayerTypeChange}
                        value="EsriFeatureLayer" />
                    <label htmlFor="overlay-input-EsriFeatureLayer">EsriFeatureLayer</label><br/>
                    <TooltipIcon tooltipName={Config.tooltips.EsriFeatureLayer} />
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
            <FontAwesomeIcon icon='plus-square' size="2x"/>
        </button>
    );
  }
}

export default AddOverlay;
