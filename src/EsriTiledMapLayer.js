import PropTypes from 'prop-types';
import {GridLayer, withLeaflet} from 'react-leaflet';
import {tiledMapLayer} from 'esri-leaflet';

 class EsriTiledMapLayer extends GridLayer {
  static propTypes = {
    url: PropTypes.string.isRequired
  };

  createLeafletElement(props) {
    return tiledMapLayer(props); 
  }
}

export default withLeaflet(EsriTiledMapLayer);