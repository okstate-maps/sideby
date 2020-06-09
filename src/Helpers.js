import { fetchJson } from './Util';
 
export function getThumbnailByLayerType(layerProps){

    var layerType = layerProps.layer_type;
    var url = layerProps.url;
    var default_thumb = process.env.PUBLIC_URL + 
                        '/assets/images/default.jpg';
    var thumbnail_path;

    switch (layerType) {

      case 'EsriDynamicMapLayer':
      case 'EsriImageLayer':
      case 'EsriTiledMapLayer':
           thumbnail_path = url + '/info/thumbnail/thumbnail.png';

        break;

      case 'WMSTileLayer':

        if (url.indexOf('geoserver') >= 0){

          //for more on wms reflector see https://docs.geoserver.org/latest/en/user/tutorials/wmsreflector.html
          thumbnail_path = url + 
                           '/reflect?height=200&width=300&layers=' + 
                           layerProps.layers;
        }

        break;
      //case 'TileLayer':
      //case 'WFSLayer':    

      case 'WMTSTileLayer':

        if (url.indexOf('MapServer/WMTS') >= 0){
          //this.thumbnail_path = this.props.url.slice(0, this.props.url.indexOf('/WMTS')) + '/info/thumbnail/thumbnail.png';
          thumbnail_path = url.slice(0, url.indexOf('/WMTS')) + 
                           '/info/thumbnail/thumbnail.png';
        }
    
        break;

      default:
        thumbnail_path = default_thumb;
        break;
    }

    if (!thumbnail_path) {
      thumbnail_path = default_thumb;
    }

    return thumbnail_path;

    // if (!this.thumbnail_path) {
    //   this.guessLayerTypeByUrl(this.props.url);
    // }
  }


export function guessLayerTypeByUrl(url){
  let typeREs = {
        TileLayer: /.*\{z\}.*\{x\}.*\{y\}.*/,
        WMSTileLayer: /.*wms.*/i,
        WMTSTileLayer: /.*wmts.*/i,
        EsriImageLayer: /.*ImageServer.*/,
        EsriFeatureLayer: /.*FeatureServer.*/, //though an individ layer from esri dynam map service can also act as a feature layer...
        EsriTiledMapLayer: /.*MapServer.*/, 
  };
  let submittedUrl = url;
  let newType = null;
   
  Object.entries(typeREs).forEach((lyrTypeRE) => {
    if (lyrTypeRE[1].test(submittedUrl)) {
      newType = lyrTypeRE[0];
    }
  });

  return newType;
}

//not used currently, but works with VectorGrid layers
export const vectorTileStyling = {

      water: {
        fill: true,
        weight: 1,
        fillColor: '#06cccc',
        color: '#06cccc',
        fillOpacity: 0.2,
        opacity: 0.4,
      },
      admin: {
        weight: 1,
        fillColor: 'pink',
        color: 'pink',
        fillOpacity: 0.2,
        opacity: 0.4
      },
      waterway: {
        weight: 1,
        fillColor: '#2375e0',
        color: '#2375e0',
        fillOpacity: 0.2,
        opacity: 0.4
      },
      landcover: {
        fill: true,
        weight: 1,
        fillColor: '#53e033',
        color: '#53e033',
        fillOpacity: 0.2,
        opacity: 0.4,
      },
      landuse: {
        fill: true,
        weight: 1,
        fillColor: '#e5b404',
        color: '#e5b404',
        fillOpacity: 0.2,
        opacity: 0.4
      },
      park: {
        fill: true,
        weight: 1,
        fillColor: '#84ea5b',
        color: '#84ea5b',
        fillOpacity: 0.2,
        opacity: 0.4
      },
      boundary: {
        weight: 1,
        fillColor: '#c545d3',
        color: '#c545d3',
        fillOpacity: 0.2,
        opacity: 0.4
      },
      aeroway: {
        weight: 1,
        fillColor: '#51aeb5',
        color: '#51aeb5',
        fillOpacity: 0.2,
        opacity: 0.4
      },
      road: { // mapbox & nextzen only
        weight: 1,
        fillColor: '#f2b648',
        color: '#f2b648',
        fillOpacity: 0.2,
        opacity: 0.4
      },
      tunnel: { // mapbox only
        weight: 0.5,
        fillColor: '#f2b648',
        color: '#f2b648',
        fillOpacity: 0.2,
        opacity: 0.4,
//          dashArray: [4, 4]
      },
      bridge: { // mapbox only
        weight: 0.5,
        fillColor: '#f2b648',
        color: '#f2b648',
        fillOpacity: 0.2,
        opacity: 0.4,
//          dashArray: [4, 4]
      },
      transportation: { // openmaptiles only
        weight: 0.5,
        fillColor: '#f2b648',
        color: '#f2b648',
        fillOpacity: 0.2,
        opacity: 0.4,
//          dashArray: [4, 4]
      },
      transit: {  // nextzen only
        weight: 0.5,
        fillColor: '#f2b648',
        color: '#f2b648',
        fillOpacity: 0.2,
        opacity: 0.4,
//          dashArray: [4, 4]
      },
      building: {
        fill: true,
        weight: 1,
        fillColor: '#2b2b2b',
        color: '#2b2b2b',
        fillOpacity: 0.2,
        opacity: 0.4
      },
      water_name: {
        weight: 1,
        fillColor: '#022c5b',
        color: '#022c5b',
        fillOpacity: 0.2,
        opacity: 0.4
      },
      transportation_name: {
        weight: 1,
        fillColor: '#bc6b38',
        color: '#bc6b38',
        fillOpacity: 0.2,
        opacity: 0.4
      },
      place: {
        weight: 1,
        fillColor: '#f20e93',
        color: '#f20e93',
        fillOpacity: 0.2,
        opacity: 0.4
      },
      housenumber: {
        weight: 1,
        fillColor: '#ef4c8b',
        color: '#ef4c8b',
        fillOpacity: 0.2,
        opacity: 0.4
      },
      poi: {
        weight: 1,
        fillColor: '#3bb50a',
        color: '#3bb50a',
        fillOpacity: 0.2,
        opacity: 0.4
      },
      earth: {  // nextzen only
        fill: true,
        weight: 1,
        fillColor: '#c0c0c0',
        color: '#c0c0c0',
        fillOpacity: 0.2,
        opacity: 0.4
      },


      // Do not symbolize some stuff for mapbox
      country_label: [],
      marine_label: [],
      state_label: [],
      place_label: [],
      waterway_label: [],
      poi_label: [],
      road_label: [],
      housenum_label: [],


      // Do not symbolize some stuff for openmaptiles
      country_name: [],
      marine_name: [],
      state_name: [],
      place_name: [],
      waterway_name: [],
      poi_name: [],
      road_name: [],
      housenum_name: [],
    };