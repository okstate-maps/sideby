import React, { Component } from 'react';
//import Config from './Config';
import './Item.css';

class Item extends Component {

  constructor(props) {
    super(props);
    this.Config = window.Config;
    this.onClick = this.onClick.bind(this);
    this.state = {isToggledOn: false,
                  opacity: 1.0};
    this.resolveThumbnail.bind(this);
    this.getThumbnailByLayerType.bind(this);
    this.guessLayerTypeByUrl.bind(this);
    this.resolveThumbnail();

  }
 
  guessLayerTypeByUrl(){

  }

  getThumbnailByLayerType(layerType){

    // switch (layerType) {

    //   case "TileLayer" {

    //   }
    // }
  }


  resolveThumbnail() {
    if (this.props.thumbnail_file){
      if (this.props.thumbnail_file.startsWith("http")){
        this.thumbnail_path = this.props.thumbnail_file;
      }
      else {
        this.thumbnail_path = 'assets/images/' + this.props.thumbnail_file;
      }  
    }
    if (this.props.type){
      this.getThumbnailByLayerType(this.props.type);
    }
  }

  onClick(e) {

    let numLyrs = this.props.numberOfLayersOn;

  
    if (numLyrs === this.Config.maxLayers) {
      if (!this.state.isToggledOn){
        window.vex.dialog.alert(this.Config.maxLayersWarning.replace("{maxLayers}", this.Config.maxLayers));
        return
      }
    }

    this.setState(prevState => ({
      isToggledOn: !prevState.isToggledOn,
      opacity: 1.0
    }));


    let props = {
      "opacity": 1.0,
      ...this.props
    };
    delete(props.onItemClick);
    delete(props.isToggledOn);   
    props.isToggledOn = !this.state.isToggledOn;
    
    this.props.onItemClick(props);



    //   "sortVal": this.props.sortVal,
    //   "id": this.props.id,
    //   "thumbnail_file": this.props.thumbnail_file,
    //   "url": this.props.url,
    //   "type": this.props.type,
    //   "layers": this.props.layers,
    //   "maxZoom": this.props.maxZoom,
    //   "display_name": this.props.display_name

  }

  render() {
    let dispName = this.props.display_name;
    return (
      <button className={this.state.isToggledOn ? 'item on' : 'item off'} 
          onClick={this.onClick} 
          style={{backgroundImage: "url('" + this.thumbnail_path + "')"}}
          id={this.props.id}>
        <div className={dispName.length >= 10 ? "label long-title" : "label"}>
          {dispName.length >= 20 ? dispName.slice(0,21)+"..." : dispName}
        </div>

        <div className="button">

        </div>
      </button>
    );
  }
}

export default Item;
