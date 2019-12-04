import { MapControl, withLeaflet } from 'react-leaflet';
import L from 'leaflet';
import './Leaflet.loading/Control.Loading.js';
import './Leaflet.loading/Control.Loading.css';
import './LeafletLoadingControl.css';


class LeafletLoadingControl extends MapControl {

  createLeafletElement(props) {
  	let opts = props.opts;
    return new L.Control.Loading(opts); 
  }
}

export default withLeaflet(LeafletLoadingControl);