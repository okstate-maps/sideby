import {Path, withLeaflet} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-wfst';

type Props = {
  url: string 
} & WFSLayerProps

class WFSLayer extends Path<LeafletElement, Props> {
  createLeafletElement(props: Props): LeafletElement {
    const el = new L.WFS(this.getOptions(props))
  	
    this.contextValue = {
      ...props.leaflet,
      layerContainer: el,
      popupContainer: el,
    }
    return el
  }

  updateLeafletElement(fromProps: Props, toProps: Props) {
    if (toProps.url !== fromProps.url) {
      this.leafletElement.setUrl(toProps.url)
    }
  }
}

export default withLeaflet(WFSLayer)
