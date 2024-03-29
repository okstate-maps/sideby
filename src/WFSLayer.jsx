import { useEffect } from 'react';
import {createPathComponent} from '@react-leaflet/core';
import L from 'leaflet';
import 'leaflet-wfst';

const updateOnCanvas = (map) => {
     
}

const createLeafletElement = (props, context) => {
  useEffect(() => {
    return () => {
      updateOnCanvas(context.map);
    }
  }, []);
  
  const instance = new L.WFS(props);    
  return { instance, context }; 
}

const updateLeafletElement = (instance, props, prevProps) => {
  // @ts-ignore
  updateOnCanvas(instance._map);
}

// Pass the control instance to the React-Leaflet createControlComponent hook:
const WFSLayer = createPathComponent(createLeafletElement, updateLeafletElement);
export default WFSLayer;
