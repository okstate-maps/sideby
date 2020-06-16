import React, { Component } from 'react';
import { cloneDeep } from 'lodash';
import Item from './Item';
import AddLayerItem from './AddLayerItem';
import DeleteLayersItem from './DeleteLayersItem';
import ScrollButton from './ScrollButton';
//import LayersInfo from './LayersInfo';
import './ViewBar.css';

class ViewBar extends Component {

  constructor(props) {
    super(props);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handleScrollButtonClick = this.handleScrollButtonClick.bind(this);
    this.scrollTo = this.scrollTo.bind(this);
    this.onWheel = this.onWheel.bind(this);
    this.easeInOutQuad = this.easeInOutQuad.bind(this);
    this.state = {};
  }

  handleItemClick(data) {
    let id = data.id;
    let newState = cloneDeep(this.state);

    newState.layers.forEach( (lyr,index) => {
      if (lyr.id === id) {
        newState.layers[index] = data;
      }
    });

    this.setState(newState);   
    this.props.onItemClick(data);
  }

  handleScrollButtonClick(scrollDirection) {
    this.scrollTo(scrollDirection, 350);
  }

  componentDidUpdate(prevProps, prevState){
    if (this.props.newLayer){

      if (prevProps.newLayer && (prevProps.newLayer.id === this.props.newLayer.id)) {
        return
      }

      let newLayer = this.props.newLayer;
      let layers = this.state.layers;
    
      layers.push(newLayer);

      this.setState({'layers': layers});
    }

    if (this.props.viewbarLayers && this.props.viewbarLayers.length !== this.state.layers.length){
      this.setState({'layers': this.props.viewbarLayers});
    }
  }

  componentDidMount(prevProps, prevState){
    //for the initial app load, set state using LayersInfo
    this.setState({'layers': this.props.viewbarLayers});
  }

  onWheel(e){
    let elem  = document.getElementById('viewbarItems'),
        scrollUnit = 50,

        // deltaMode indicates if the deltaY value is pixels or lines (0 for pixels, 1 for lines, 2 for page)
        deltaMode = e.deltaMode,

        //if the deltamode is anything but pixels (0), use scroll unit to calculate scroll amount
        scrollSize = deltaMode === (1 || 2) ? e.deltaY * scrollUnit: e.deltaY;

    elem.scrollLeft = elem.scrollLeft + scrollSize;
  }

  scrollTo(direction, duration) {
    let elem  = document.getElementById('viewbarItems'),
        start = elem.scrollLeft,
        clientWidth = document.documentElement.clientWidth,
        moveSize = Math.max(clientWidth/2, 300),
        change = direction === 'left' ? -moveSize : +moveSize,
        currentTime = 0,
        increment = 20,
        that = this;
        
    let animateScroll = function(){        
        currentTime += increment;
        let val = that.easeInOutQuad(currentTime, start, change, duration);
        elem.scrollLeft = val;
        if(currentTime < duration) {
            setTimeout(animateScroll, increment);
        }
    };
    animateScroll();
  }

  //t = current time
  //b = start value
  //c = change in value
  //d = duration
  easeInOutQuad(t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
  }

  render() {
    const items = this.state.layers || [];
    let deleteModeActive = this.props.deleteModeActive;

    return (
      <footer id='Viewbar' className='ViewBar-container bottom'>
        <ScrollButton direction='left' onClick={this.handleScrollButtonClick}/>

         <div onWheel={this.onWheel} onScroll={this.onScroll} scrollleft={this.state.scrollLeft} className='flip-move' id='viewbarItems'>
           
           {items.map(item => <Item
                deleteModeActive={deleteModeActive} 
                deleteLayer={this.props.deleteLayer}
                numberOfLayersOn={this.props.numberOfLayersOn}
                key={item.id} 
                onItemClick={this.handleItemClick}
                openModal={this.props.openModal}
                closeModal={this.props.closeModal}
                rebuildTooltip={this.props.rebuildTooltip}
                {...item}
              />)}

            <AddLayerItem 
              rebuildTooltip={this.props.rebuildTooltip}
              numberOfLayersOn={this.props.numberOfLayersOn} 
              openModal={this.props.openModal}
              closeModal={this.props.closeModal}
              addLayer={this.props.addLayer} 
              />

            {items.length > 0 &&
              <DeleteLayersItem
                rebuildTooltip={this.props.rebuildTooltip}
                deleteModeActive={deleteModeActive} 
                toggleDeleteMode={this.props.toggleDeleteMode}
                />
            }
          </div>
        <ScrollButton direction='right' onClick={this.handleScrollButtonClick}/>
      </footer>
    );
  }
}

export default ViewBar;
