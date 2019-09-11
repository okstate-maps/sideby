import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLayerPlus } from '@fortawesome/pro-solid-svg-icons';
import { faLayerGroup } from '@fortawesome/pro-duotone-svg-icons';


class AddOverlay extends Component {

  constructor(props) {
    super(props);
    library.add(faLayerPlus);
    library.add(faLayerGroup);
    this.onClick = this.onClick.bind(this);
  }
 

  onClick(e) {
    let that = this;
    window.vex.dialog.open({
      message: 'Add a new overlay!',
/*
    What an Item looks like.
                key={item.id} 
                type={item.type}   done 
                id={item.id}            done
                url={item.url}            done
                layers={item.layers} skip for now
                sortVal={item.sortVal}  
                display_name={item.display_name}
                thumbnail_file={item.thumbnail_file}
                maxZoom={item.maxZoom ? item.maxZoom : 20}
  */
      input: [
          '<style>',
              '.vex-custom-field-wrapper {',
                  'margin: 1em 0;',
              '}',
              '.vex-custom-field-wrapper > label {',
                  'display: inline-block;',
                  'margin-bottom: .2em;',
              '}',
          '</style>',
          '<div class="vex-custom-field-wrapper">',
              '<label for="url">Url</label>',
              '<div class="vex-custom-input-wrapper">',
                  '<input name="url" type="text" value="https://maps.owrb.ok.gov/arcgis/rest/services/Base/SDE_State_County_PLSS_WMAS84/MapServer"/>',
              '</div>',
          '</div>',
          '<div class="vex-custom-field-wrapper">',
              '<label for="type">Type</label>',
              '<div class="vex-custom-input-wrapper">',
                  '<input name="type" id="EsriFeatureLayer" type="radio" value="EsriFeatureLayer" />',
                  '<label for="EsriFeatureLayer">Esri Feature Layer</label><br>',
                  '<input name="type" type="radio" value="WMSTileLayer" />',
                  '<label for="WMSTileLayer">WMSTileLayer</label><br>', 
                  '<input name="type" type="radio" value="EsriDynamicMapLayer" />',
                  '<label for="EsriDynamicMapLayer">EsriDynamicMapLayer</label><br>',     
                  '<input name="type" type="radio" value="ImageMapLayer" />',
                  '<label for="ImageMapLayer">ImageMapLayer</label><br>',
              '</div>',
          '</div>',
          '<div class="vex-custom-field-wrapper">',
              '<label for="display_name">Display Name</label>',
              '<div class="vex-custom-input-wrapper">',
                  '<input name="display_name" type="text" value="Orange" />',
              '</div>',
            '</div>'
         
      ].join(''),
      callback: function (data) {
          if (!data) {
              return console.log('Cancelled')
          }
          that.props.addOverlay(data);
     }
    });
  }

  render() {
    return (
      <div>
        <button className='add-overlay' 
            onClick={this.onClick} 
            id='add-overlay'>
          <div className="icon-label">
            {this.props.overlays.length === 0 && <FontAwesomeIcon icon='layer-plus' size="2x"/>}
            {this.props.overlays.length > 0 && <FontAwesomeIcon icon={['fad','layer-group']} size="2x"/>}
          </div>

        </button>
      </div>
    );
  }
}

export default AddOverlay;
