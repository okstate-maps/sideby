import { fetchJson } from './Util';
 
export function getThumbnailByLayerType(layerProps){

    var layerType = layerProps.type;
    var url = layerProps.url;
    var default_thumb = process.env.PUBLIC_URL + 
                        '/assets/images/default.jpg';
    var thumbnail_path;

    switch (layerType) {

      case "EsriDynamicMapLayer":
      case "EsriImageLayer":
      case "EsriTiledMapLayer":

        fetchJson(url + "/info/iteminfo?f=json").then(function (r){
            if (r.data.thumbnail) {
              thumbnail_path = url + "/info/" + r.data.thumbnail;
            }
        });
        break;

      case "WMSTileLayer":

        if (url.indexOf('geoserver') >= 0){

          //for more on wms reflector see https://docs.geoserver.org/latest/en/user/tutorials/wmsreflector.html
          thumbnail_path = url + 
                           "/reflect?height=200&width=300&layers=" + 
                           layerProps.layers;
        }

        break;
      //case "TileLayer":
      //case "WFSLayer":    

      case "WMTSTileLayer":

        if (url.indexOf('MapServer/WMTS') >= 0){
          //this.thumbnail_path = this.props.url.slice(0, this.props.url.indexOf('/WMTS')) + "/info/thumbnail/thumbnail.png";
          thumbnail_path = url.slice(0, url.indexOf('/WMTS')) + 
                           "/info/thumbnail/thumbnail.png";
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


export function guessLayerTypeByUrl(layerProps){

}
