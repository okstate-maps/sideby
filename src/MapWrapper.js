import React, { Component, PureComponent } from 'react';
import { cloneDeep } from 'lodash';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';
import 'leaflet.sync';
import 'leaflet-loading';
import { MapContainer, TileLayer, WMSTileLayer, Marker, CircleMarker} from 'react-leaflet';
import WMTSTileLayer from './Leaflet.WMTS/index';
import WFSLayer from './WFSLayer';
import LeafletLoadingControl from './LeafletLoadingControl';
import { BasemapLayer, FeatureLayer, TiledMapLayer, ImageMapLayer, 
  DynamicMapLayer} from 'react-esri-leaflet';
import VectorBasemapLayer from "react-esri-leaflet/plugins/VectorBasemapLayer";
import VectorTileLayer from "react-esri-leaflet/plugins/VectorTileLayer";
import { deleteArrayofKeys } from './Util';
import './MapWrapper.css'
import './Handle.css';


library.add(faGripVertical);

class Handle extends React.Component {
  render() {
    const { provided, display_name } = this.props;
    return (
      <div className='Handle map-title'>
         <span className='Handle-span' {...provided.dragHandleProps}>
          <FontAwesomeIcon className='Handle-drag-icon' icon='grip-vertical' size='1x'/>
        </span>
         &nbsp;{display_name.length > 20 ? display_name.slice(0, 20)+'...' : display_name}
      </div>
    );
  }
}


class MapWrapper extends React.PureComponent {
  static whyDidYouRender = true;
  constructor(props, context) {
    super(props)
    this.Config = window.sideby.Config;
    this.mapboxToken = this.Config.mapboxToken;
    this.labelLayerUrl = this.Config.labelLayerUrl + this.mapboxToken;

    const DEFAULT_VIEWPORT = {
      center: this.Config.mapDefaultCenter,
      zoom: this.Config.mapDefaultZoom
    }
    this.viewport = DEFAULT_VIEWPORT;
    this.invalidateMapSizes = this.invalidateMapSizes.bind(this);
    this.syncMaps = this.syncMaps.bind(this);
    this.unsyncMaps = this.unsyncMaps.bind(this);
    this.moveend = this.moveend.bind(this);
    this.onViewportChanged = this.onViewportChanged.bind(this);
    this.passUpMapInstance = this.passUpMapInstance.bind(this);
    this.onResize = this.onResize.bind(this);
    this.onGeocodeClick = this.onGeocodeClick.bind(this);
    this.bboxStringToLatLngBoundsArray = this.bboxStringToLatLngBoundsArray.bind(this);
    this.checkLayerBounds = this.checkLayerBounds.bind(this);
    
    // The following parameters are not passed on to the map layer. This
    // was originally implemented to avoid confusing WMS servers, and
    // there may be unintended consequences.
    this.layerOptionBlacklist = ['minZoom', 'maxZoom', 'isToggledOn',
         'visibleIndex','id','start_bounds','thumbnail_path',
         'display_name','numberOfLayersOn','deleteLayer','closeModal', 
         'openModal','rebuildTooltip', 'leaflet','layer_type','row'];

    this.layer_components = {
      'EsriFeatureLayer': FeatureLayer,
      'EsriTiledMapLayer': TiledMapLayer,
      'EsriImageLayer': ImageMapLayer,
      'EsriDynamicMapLayer': DynamicMapLayer,
      'EsriVectorBasemapLayer': VectorBasemapLayer,
      'EsriVectorTileLayer': VectorTileLayer,
      'TileLayer': TileLayer,
      'WFSLayer': WFSLayer,
      'WMSTileLayer': WMSTileLayer,
      'WMTSTileLayer': WMTSTileLayer
    };

    this.Overlays = () => {return (
    <>
      {this.props.overlays.map(layer => {
        let Overlay = this.layer_components[layer.layer_type];
        return  (
          <Overlay  
              format='image/png8' 
              transparent='true'
              url={layer.url}
              key={layer.id}
              zIndex={layer.is_basemap ? 1 : 100000}
              pane={layer.is_basemap ? 'tilePane' : 'overlayPane'}
              {...deleteArrayofKeys(cloneDeep(layer), this.layerOptionBlacklist)}
              />
        )
      })}
    </>)
  };
  }

  componentWillUnmount(){
    this.passUpMapInstance(this.props.layer.id, this.mapRef, true);
  }

  componentDidMount(prevProps, prevState){}

  componentDidUpdate(prevProps, prevState) {}

  onResize(e) {}

  moveend(e) {}
  
  invalidateMapSizes() {
    this.props.invalidateMapSizes();
  }
  
  unsyncMaps(instance_id) {
     this.props.unsyncMaps(instance_id);
  }

  syncMaps() {
    this.props.syncMaps();
  }

  passUpMapInstance(id, instance, deleteInstance=false) {
    this.props.passUpMapInstance(id, instance, deleteInstance);
  }

  bboxStringToLatLngBoundsArray(){
      var a = this.props.layer.start_bounds.split(',');
      return [[a[1],a[0]], [a[3],a[2]]];
  }; 

  checkLayerBounds(){
    let layer = this.props.layer;
    
    if (layer.start_bounds) {
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
    //console.log("Render:MapWrapper ");
   

    const Overlays = this.Overlays;    
    var layer = cloneDeep(this.props.layer);
    let that = this;
    let Layer = this.layer_components[layer.layer_type];
    var layerId = layer.id;
    const { provided } = this.props;

    return (<div
              {...provided.draggableProps}
              ref={provided.innerRef}>
              <Handle provided={provided} display_name={layer.display_name} />
              <MapContainer 
                 minZoom={this.Config.mapMinZoom}
                 bounds={this.checkLayerBounds()}
                 onResize={this.onResize}
                 maxZoom={layer.maxZoom}
                 onViewportChanged={that.onViewportChanged}
                 className ={'map'+ this.props.numberLayers + (this.props.isDragging ? 'dragging': '')}  
                 id={layerId}
                 key={layerId} 
                 center={this.viewport.center}
                 zoom={this.viewport.zoom}
                 zoomControlAdded={true}
                 loadingControl={true}
                 preferCanvas={false} //fixes window resizing bug, for now...
                 whenCreated={(mapInstance) => {this.passUpMapInstance(layerId, mapInstance)}}
                 >

                <LeafletLoadingControl 
                    position='bottomleft'
                    spinjs={true}
                    separate={true}
                    //delayIndicator=1000, //this doesn't actually seem to work...
                    spin={{
                      lines:15,
                      length:10,
                      width:3,
                      radius:15,
                      color:'#ffffff',
                      left:'100%',
                      top:'-25%', 
                      fadeColor:'black',
                      shadow:'0 0 5px black'
                    }}
                  /> 

                {this.props.geocodeResult &&
                  <Marker position={this.props.geocodeResult}
                          onClick={this.onGeocodeClick}/>
                }

                {this.props.labelLayerOn &&
                  <TileLayer 
                    key={'labels-' + layer.id}
                    url={this.labelLayerUrl}
                    pane='shadowPane'
                    zIndex={1000000} />
                }
                  
                {this.props.overlays.length > 0 && <Overlays />}

                <Layer 
                  key={layer.id} 
                  zIndex={1000000}
                  {...deleteArrayofKeys(layer, this.layerOptionBlacklist)}
                />
              

            </MapContainer>
          </div>
    )
  }
}  

//export default React.forwardRef((props, ref) => <MapWrapper mapRef={ref} {...props} />);
export default MapWrapper;
