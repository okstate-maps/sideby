import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap, faPlus} from '@fortawesome/free-solid-svg-icons';
import AddLayerItemForm from './AddLayerItemForm';
import TooltipIcon from './TooltipIcon';
import TooltipText from './TooltipText';
import Item from './Item';

class AddLayerItem extends Item {

  constructor(props) {
    super(props);
    this.Config = window.sideby.Config;
    library.add(faMap);
    library.add(faPlus);
    this.onClick = this.onClick.bind(this);
    this.state = {isToggledOn: false,
                  opacity: 1.0};
    this.modalType = 'AddLayerItem';
  }
 
  onClick(e) {
    let modalContent = <AddLayerItemForm {...this.props} />
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
