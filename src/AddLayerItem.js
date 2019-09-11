import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMap, faPlus, faLayerPlus } from '@fortawesome/pro-solid-svg-icons';
import Item from './Item';

class AddLayerItem extends Item {

  constructor(props) {
    super(props);
    library.add(faMap);
    library.add(faPlus);
    library.add(faLayerPlus);
    this.onClick = this.onClick.bind(this);
    this.state = {isToggledOn: false,
                  opacity: 1.0};
  }
 

  onClick(e) {
    let that = this;

    let modalContent = <div><label htmlFor="url">Url:</label>
      <textarea name="url" value=""/><br/>
      <label htmlFor="type">Type</label><br/>
      <input name="type" id="input-TileLayer" type="radio" value="TileLayer" />
      <label htmlFor="input-TileLayer">TileLayer</label><br/>
      <input name="type" id="input-WMSTileLayer" type="radio" value="WMSTileLayer" />
      <label htmlFor="input-WMSTileLayer">WMSTileLayer</label><br/>
      <input name="type" id="input-EsriTiledMapLayer" type="radio" value="EsriTiledMapLayer" />
      <label htmlFor="input-EsriTiledMapLayer">EsriTiledMapLayer</label><br/>
      <input name="type" id="input-EsriDynamicMapLayer" type="radio" value="EsriDynamicMapLayer" />
      <label htmlFor="input-EsriDynamicMapLayer">EsriDynamicMapLayer</label></div>;

      this.props.openModal("poop", modalContent);

     //window.vex.dialog.open({
    //   message: 'Add a new layer!',
    //   /*
    //   What an Item looks like.
    //             key={item.id} 
    //             type={item.type}   done 
    //             id={item.id}            done
    //             url={item.url}            done
    //             layers={item.layers} skip for now
    //             sortVal={item.sortVal}  
    //             display_name={item.display_name}
    //             thumbnail_file={item.thumbnail_file}
    //             maxZoom={item.maxZoom ? item.maxZoom : 20}
    //   */
    //   input: [
    //       '<style>',
    //           '.vex-custom-field-wrapper {',
    //               'margin: 1em 0;',
    //           '}',
    //           '.vex-custom-field-wrapper > label {',
    //               'display: inline-block;',
    //               'margin-bottom: .2em;',
    //           '}',
    //       '</style>',
    //       '<div class="vex-custom-field-wrapper">',
    //           '<label for="url">Url</label>',
    //           '<div class="vex-custom-input-wrapper">',
    //               '<input name="url" type="text" value=""/>',
    //           '</div>',
    //       '</div>',
    //       '<div class="vex-custom-field-wrapper">',
    //           '<label for="type">Type</label>',
    //           '<div class="vex-custom-input-wrapper">',
    //               '<input name="type" id="TileLayer" type="radio" value="TileLayer" />',
    //               '<label for="TileLayer">TileLayer</label><br>',
    //               '<input name="type" type="radio" value="WMSTileLayer" />',
    //               '<label for="WMSTileLayer">WMSTileLayer</label><br>',
    //               '<input name="type" type="radio" value="EsriTiledMapLayer" />',
    //               '<label for="EsriTiledMapLayer">EsriTiledMapLayer</label>',
    //               '<input name="type" type="radio" value="EsriDynamicMapLayer" />',
    //               '<label for="EsriDynamicMapLayer">EsriDynamicMapLayer</label>',
    //           '</div>',
    //       '</div>',
    //       '<div class="vex-custom-field-wrapper">',
    //           '<label for="display_name">Display Name</label>',
    //           '<div class="vex-custom-input-wrapper">',
    //               '<input name="display_name" type="text" value="Orange" />',
    //           '</div>',
    //         '</div>'
         
    //   ].join(''),
    //   callback: function (data) {
    //       if (!data) {
    //           return console.log('Cancelled')
    //       }
    //       that.props.addLayer(data);
    //  }
    // });
  }

  render() {
    return (
      <button className='add-layer item background-black' 
          onClick={this.onClick} 
          id='add-layer'>
        <div className="icon-label">
          <span className="fa-layers fa-fw">
            <FontAwesomeIcon icon="layer-plus" size="5x" transform="left-6.9"/>
            {/*<FontAwesomeIcon icon="map" className="orange" size="5x" transform="left-6.9"/>
            <FontAwesomeIcon icon="plus"  transform="grow-9.5" />*/}
          </span>
        </div>
      </button>
    );
  }
}

export default AddLayerItem;
