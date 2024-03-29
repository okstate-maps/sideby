import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap, faPlus} from '@fortawesome/free-solid-svg-icons';
import AddLayerItemForm from './AddLayerItemForm';
import BasemapGalleryForm from './BasemapGalleryForm';
import { isMobile } from './Util';
import Item from './Item';
import BasemapGallery from './BasemapGallery';


class AddLayerItem extends Item {

  constructor(props) {
    super(props);
    this.Config = window.sideby.Config;
    library.add(faMap);
    library.add(faPlus);
    this.onClick = this.onClick.bind(this);
    this.setForm = this.setForm.bind(this);
    this.state = {isToggledOn: false,
                  newLayerType: false};
    this.modalType = 'AddLayerItem';
  }
 
  setForm(formName){
    this.props.closeModal(); 
    let Form = formName;
    this.props.openModal('', <Form {...this.props}/>);
  }


  onClick(e) {
    let modalContent = <div>
      <button onClick={()=>this.setForm(BasemapGalleryForm)}>
        Choose from a list of basemaps
      </button>
      <br/>
      <button onClick={()=>this.setForm(AddLayerItemForm)}>
        Add your own
      </button>
      
    </div>;
    this.props.openModal('', modalContent);
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
          name='Add Layer'
          id='add-layer'>
        <div className='icon-label'>
          <span className='fa-layers fa-fw fa-5x'>
            <FontAwesomeIcon icon='map'/>
            <FontAwesomeIcon icon='plus' transform='shrink-5' color='white' />
          </span>
        </div>
      </button>
    );
  }
}

export default AddLayerItem;
