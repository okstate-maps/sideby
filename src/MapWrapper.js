import React, { Component } from 'react';
import {Map, TileLayer, WMSTileLayer, Marker} from 'react-leaflet';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';
import EsriTiledMapLayer from './EsriTiledMapLayer';
import EsriDynamicMapLayer from './EsriDynamicMapLayer';
import EsriFeatureLayer from './EsriFeatureLayer';
import {mapboxToken, 
        labelLayerUrl, 
        mapMinZoom, 
        mapDefaultZoom, 
        mapDefaultCenter} from './Config';
import 'leaflet.sync';
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
    this.mapboxToken = mapboxToken;
    this.labelLayerUrl = labelLayerUrl + this.mapboxToken;

    const DEFAULT_VIEWPORT = {
      center: mapDefaultCenter,
      zoom: mapDefaultZoom
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
  }

  componentWillUnmount(){
    this.passUpRef(this.props.layer.id, this.props.mapRef, true);
  }

  componentDidMount(prevProps, prevState){
    this.passUpRef(this.props.layer.id, this.props.mapRef);
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
      "EsriDynamicMapLayer": EsriDynamicMapLayer,
      "WMSTileLayer": WMSTileLayer,
      "TileLayer": TileLayer
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
                {...layer}
                />
          )
        })}
      </>)
    };
    const layer = this.props.layer;
    let that = this;
    let Layer = layer_components[layer.type];
    const { provided } = this.props;
  

    // Use ids from layers array to create list of urls
    return (<div 
              {...provided.draggableProps}
              ref={provided.innerRef}>
              <Handle provided={provided} display_name={layer.display_name} />
              <Map ref={this.props.mapRef}
                 minZoom={mapMinZoom}
                 bounds={this.checkLayerBounds()}
                 onResize={this.onResize}
                 maxZoom={layer.maxZoom}
                 onViewportChanged={that.onViewportChanged}
                 className ={'map'+ this.props.numberLayers + (this.props.isDragging ? "dragging": "nope")}  
                 id={layer.id}
                 key={layer.id} 
                 viewport={that.viewport}
                 zoomControl={layer.visibleIndex === 0 ? true : false}
                >

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
                  {...layer}
                />

            </Map>
          </div>
    )
  }
}  


export default React.forwardRef((props, ref) => <MapWrapper mapRef={ref} {...props} />);

