import { createControlComponent  } from '@react-leaflet/core';
import L from 'leaflet';
import './Leaflet.loading/Control.Loading.js';
import './LeafletLoadingControl.css';

const createControlLayer = (props) => {
  // Set up an instance of the control:
  const controlInstance = new L.Control.loading(props);
  return controlInstance;
};

// Pass the control instance to the React-Leaflet createControlComponent hook:
const LeafletLoadingControl = createControlComponent(createControlLayer);

export default LeafletLoadingControl;