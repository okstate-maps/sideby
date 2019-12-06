import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap, faPlus} from '@fortawesome/free-solid-svg-icons';
import TooltipIcon from './TooltipIcon';
import Item from './Item';

class AddLayerItem extends Item {

  constructor(props) {
    super(props);
    this.Config = window.Config;
    library.add(faMap);
    library.add(faPlus);
    this.onClick = this.onClick.bind(this);
    this.state = {isToggledOn: false,
                  opacity: 1.0};
      this.modalType = 'AddLayerItem';
  }
 
  onClick(e) {
    let modalContent = 
      <>
        <div className="inputGroup">
          <label className="textInputLabel" htmlFor="url">Url:</label>
          <textarea
                id='addLayerItemUrl' 
                name='addLayerItemUrl' 
                placeholder='Enter the URL to your map/data.'
                onBlur={this.onBlur}></textarea>
            <TooltipIcon tooltipName={this.Config.tooltips.Url} />
      
        </div>

        <div className="radioGroup">
          <label className="radioGroupLabel" htmlFor="layerType">Layer Type</label>

          <div className="inputGroup">
            <input name="layerType" id="input-TileLayer" type="radio" value="TileLayer" />
            <label htmlFor="input-TileLayer">TileLayer</label>
            <TooltipIcon tooltipName={this.Config.tooltips.TileLayer}/>
                
          </div>  
          
          <div className="inputGroup">
           <input 
              name="overlayType" 
              id="overlay-input-WMSTileLayer" 
              type="radio" 
              value="WMSTileLayer" />
            <label htmlFor="input-WMSTileLayer">WMSTileLayer</label>
          </div>
          
          <div className="inputGroup">         
            <input name="layerType" id="input-EsriTiledMapLayer" type="radio" value="EsriTiledMapLayer" />
            <label htmlFor="input-EsriTiledMapLayer">EsriTiledMapLayer</label>
          </div>
          
          <div className="inputGroup">
            <input name="layerType" id="input-EsriDynamicMapLayer" type="radio" value="EsriDynamicMapLayer" />
            <label htmlFor="input-EsriDynamicMapLayer">EsriDynamicMapLayer</label>
          </div>

          <div className="inputGroup">
            <input name="layerType" id="input-EsriFeatureLayer" type="radio" value="EsriFeatureLayer" />
            <label htmlFor="input-EsriFeatureLayer">EsriFeatureLayer</label>
            <TooltipIcon tooltipName={this.Config.tooltips.EsriFeatureLayer} />
          </div>
          <div className="inputGroup">
            <input name="layerType" id="input-EsriImageLayer" type="radio" value="EsriImageLayer" />
            <label htmlFor="input-EsriImageLayer">EsriImageLayer</label>

          </div>

        </div>
        
        <div className="inputGroup">
          <label className="textInputLabel" htmlFor="input-displayName">Display Name: </label>
          <input name="displayName" id="input-displayName" type="text" />
          <TooltipIcon tooltipName={this.Config.tooltips.DisplayName} />
        </div> 

        <div className="inputGroup">
          <label className="textInputLabel" htmlFor="input-thumbnailPath">Thumbnail Path: </label>
          <input name="thumbnailPath" id="input-thumbnailPath" type="text" />
          <TooltipIcon tooltipName={this.Config.tooltips.ThumbnailPath} />
        </div>
      </>;

      this.props.openModal("AddLayerItem", modalContent);

   
  }

  render() {
    return (
      <button className='add-layer item background-black' 
          onClick={this.onClick}
          title="Add Layer"
          name="Add Layer"
          id='add-layer'>
        <div className="icon-label">
          <span className="fa-layers fa-fw fa-5x">
            <FontAwesomeIcon icon="map"/>
            <FontAwesomeIcon icon="plus" transform="shrink-5" color="white" />
          </span>
        </div>
      </button>
    );
  }
}

export default AddLayerItem;
