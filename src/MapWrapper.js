import React, { Component } from 'react';
import { cloneDeep } from 'lodash';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';
import { Map, TileLayer, WMSTileLayer, Marker } from 'react-leaflet';
import WMTSTileLayer from 'react-leaflet-wmts';
import WFSLayer from './WFSLayer';
import EsriTiledMapLayer from './EsriTiledMapLayer';
import EsriDynamicMapLayer from './EsriDynamicMapLayer';
import EsriFeatureLayer from './EsriFeatureLayer';
import EsriImageLayer from './EsriImageLayer';
import LeafletLoadingControl from './LeafletLoadingControl';
import 'leaflet.sync';
import { deleteArrayofKeys } from './Util';
// import {mapboxToken, 
//         labelLayerUrl, 
//         mapMinZoom, 
//         mapDefaultZoom, 
//         mapDefaultCenter} from './Config';
import './MapWrapper.css'
import './Handle.css';

library.add(faGripVertical);

class Handle extends React.Component {
  render() {
    const { provided, display_name } = this.props;
    return (
      <div className={display_name.length >= 10 ? "Handle map-title long-title" : "Handle map-title"}>
         <span className="Handle-span" {...provided.dragHandleProps}>
          <FontAwesomeIcon className="Handle-drag-icon" icon="grip-vertical" size="1x"/>
        </span>
         &nbsp;{display_name}
      </div>
    );
  }
}


class MapWrapper extends Component {
  
  constructor(props, context) {
    super(props)
    this.Config = window.Config;
    this.mapboxToken = this.Config.mapboxToken;
    this.labelLayerUrl = this.Config.labelLayerUrl + this.mapboxToken;

    const DEFAULT_VIEWPORT = {
      center: this.Config.mapDefaultCenter,
      zoom: this.Config.mapDefaultZoom
    }
    this.viewport = DEFAULT_VIEWPORT;
    //this.props.mapCenter(this.viewport.center);
    this.invalidateMapSizes = this.invalidateMapSizes.bind(this);
    this.syncMaps = this.syncMaps.bind(this);
    this.unsyncMaps = this.unsyncMaps.bind(this);
    this.moveend = this.moveend.bind(this);
    this.onViewportChanged = this.onViewportChanged.bind(this);
    this.passUpRef = this.passUpRef.bind(this);
    this.onResize = this.onResize.bind(this);
    this.onGeocodeClick = this.onGeocodeClick.bind(this);
    this.bboxStringToLatLngBoundsArray = this.bboxStringToLatLngBoundsArray.bind(this);
    this.checkLayerBounds = this.checkLayerBounds.bind(this);

    // The following parameters are not passed on to the map layer. This
    // was originally implemented to avoid confusing WMS servers, and
    // there may be unintended consequences.
    // this.layerOptionBlacklist = ["minZoom", "maxZoom", "isToggledOn",
    //     "visibleIndex","id","startBounds","thumbnail_file",
    //     "display_name","numberOfLayersOn"];
        this.layerOptionBlacklist = [];
  }

  componentWillUnmount(){
    this.passUpRef(this.props.layer.id, this.props.mapRef, true);
  }

  componentDidMount(prevProps, prevState){
    this.passUpRef(this.props.layer.id, this.props.mapRef);
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.layer.visibleIndex !== 
          this.props.layer.visibleIndex) {

    }
  }

  onResize(e) {

  }

  moveend(e) {

  }
  
  invalidateMapSizes() {
    this.props.invalidateMapSizes();
  }
  

  unsyncMaps(ref_id) {
     this.props.unsyncMaps(ref_id);
  }

  syncMaps() {
    this.props.syncMaps();
  }

  passUpRef(id, ref, deleteRef=false) {
    this.props.passUpRef(id, ref, deleteRef);
  }

  bboxStringToLatLngBoundsArray(){
      var a = this.props.layer.startBounds.split(",");
      return [[a[1],a[0]], [a[3],a[2]]];
  }; 

  checkLayerBounds(){
    let layer = this.props.layer;
    
    if (layer.startBounds) {
      return this.bboxStringToLatLngBoundsArray()
    }

    return null;
  }


  clearGeocode() {
    this.props.clearGeocode();
  }

  onGeocodeClick() {
    this.clearGeocode();
  }

  onViewportChanged(viewport) { 
    //putting viewport into state results in (near) infinite loop of componentdidupdates
    //probably because L.sync is not react-ified
    //so just use good ole generic this.viewport instead
    this.viewport = viewport;
  }

  render() {
    const layer_components = {
      "EsriFeatureLayer": EsriFeatureLayer,
      "EsriTiledMapLayer": EsriTiledMapLayer,
      "EsriImageLayer": EsriImageLayer,
      "EsriDynamicMapLayer": EsriDynamicMapLayer,
      "WMSTileLayer": WMSTileLayer,
      "TileLayer": TileLayer,
      "WMTSTileLayer": WMTSTileLayer,
      "WFSLayer": WFSLayer
    }

    const overlays = this.props.overlays;
    const Overlays = () => {return (
      <>
        {overlays.map(layer => {
          let Overlay = layer_components[layer.type];
          return  (
            <Overlay  
                url={layer.url}
                key={layer.id} 
                zIndex={100000}
                pane="overlayPane"
                {...deleteArrayofKeys(cloneDeep(layer), this.layerOptionBlacklist)}
                />
          )
        })}
      </>)
    };
    const layer = cloneDeep(this.props.layer);
    let that = this;
    let Layer = layer_components[layer.type];
    const { provided } = this.props;

    // Use ids from layers array to create list of urls
    return (<div
              {...provided.draggableProps}
              ref={provided.innerRef}>
              <Handle provided={provided} display_name={layer.display_name} />
              <Map ref={this.props.mapRef}
                 minZoom={this.Config.mapMinZoom}
                 bounds={this.checkLayerBounds()}
                 onResize={this.onResize}
                 maxZoom={layer.maxZoom}
                 onViewportChanged={that.onViewportChanged}
                 className ={'map'+ this.props.numberLayers + (this.props.isDragging ? "dragging": "nope")}  
                 id={layer.id}
                 key={layer.id} 
                 viewport={that.viewport}
                 zoomControlAdded={true}
                 loadingControl={true}
                 preferCanvas={true} //fixes window resizing bug, for now...
                 >
                <LeafletLoadingControl opts={{
                    position: 'bottomleft',
                    spinjs: true,
                    separate: true,
                    //delayIndicator: 1000, //this doesn't actually seem to work...
                    spin:{
                      lines: 15,
                      length: 10,
                      width: 3,
                      radius: 15,
                      color: '#ffffff',
                      left:'100%',
                      top:'-25%', 
                      fadeColor: 'black',
                      shadow: '0 0 5px black'
                    }
                  }}/>

                {this.props.geocodeResult &&
                  <Marker position={this.props.geocodeResult}
                          onClick={this.onGeocodeClick}/>
                }

                {this.props.labelLayerOn &&
                  <TileLayer 
                    key={"labels-" + layer.id}
                    url={this.labelLayerUrl}
                    pane="shadowPane"
                    zIndex={1000000} />
                }
                  
                {this.props.overlays.length > 0 && <Overlays />}

                <Layer 
                  key={layer.id} 
                  {...deleteArrayofKeys(layer, this.layerOptionBlacklist)}
                />

            </Map>
          </div>
    )
  }
}  


export default React.forwardRef((props, ref) => <MapWrapper mapRef={ref} {...props} />);

