import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import { isMobile } from './Util';
import Item from './Item';

class DeleteLayersItem extends Item {

  constructor(props) {
    super(props);
    this.Config = window.sideby.Config;
    library.add(faTrashAlt);
    this.onClick = this.onClick.bind(this);
    this.state = {isToggledOn: false};
  }
 
  onClick(e) {
    this.props.toggleDeleteMode(!this.props.deleteModeActive);
  }

  render() {
    return (
      <button className={this.props.deleteModeActive ? 'item background-black deleteModeOn':'item background-black deleteModeOff'} 
          onClick={this.onClick}
          data-tip='Delete Layers'
          data-for='modal'
          data-place='top' 
          data-event='mouseover'
          data-delay-show='900'
          data-event-off='mouseout'
          data-tip-disable={isMobile} 

          name='Delete Layers'
          id='delete-layers'>
        <div className='icon-label'>
            <FontAwesomeIcon icon='trash-alt' size='5x'/>
        </div>
      </button>
    );
  }
}

export default DeleteLayersItem;
