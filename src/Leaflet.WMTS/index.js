import { useEffect } from 'react';
import { createLayerComponent, LeafletContextInterface, LayerProps  } from '@react-leaflet/core';
import WMTS from './wmts';

const updateOnCanvas = (map) => {
     
}

const createLeafletElement = (props, context) => {
  useEffect(() => {
    return () => {
      updateOnCanvas(context.map);
    }
  }, []);
  
  const instance = new WMTS(props.url, props);    
  return { instance, context }; 
}

const updateLeafletElement = (instance, props, prevProps) => {
  // @ts-ignore
  updateOnCanvas(instance._map);
}

// Pass the control instance to the React-Leaflet createControlComponent hook:
const WMTSTileLayer = createLayerComponent(createLeafletElement, updateLeafletElement);
export default WMTSTileLayer;
