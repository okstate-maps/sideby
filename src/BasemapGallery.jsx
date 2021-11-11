import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap, faPlus} from '@fortawesome/free-solid-svg-icons';
import BasemapGalleryForm from './BasemapGalleryForm';
import { isMobile } from './Util';
import Item from './Item';

class BasemapGallery extends Item {

  constructor(props) {
    super(props);
    this.Config = window.sideby.Config;
    library.add(faMap);
    library.add(faPlus);
    this.onClick = this.onClick.bind(this);
    this.state = {isToggledOn: false};
    this.modalType = 'BasemapGallery';
  }
 
  onClick(e) {
    let modalContent = <BasemapGalleryForm {...this.props} />
    this.props.openModal('BasemapGallery', modalContent);
  }

  render() {
    return (
      <button className='add-layer item background-black' 
          onClick={this.onClick}
          data-tip='Add Comparison Layer'
          data-for='modal' 
          data-place='top'
          data-event='mouseover'
          data-delay-show='900'
          data-event-off='mouseout'
          data-tip-disable={isMobile} 
          name='BasemapGallery'
          id='basemap-gallery'>
        <div className='icon-label'>
          <span className='fa-layers fa-fw fa-2x'>
            <FontAwesomeIcon icon='map'/>
          </span>
        </div>
      </button>
    );
  }
}

export default BasemapGallery;
