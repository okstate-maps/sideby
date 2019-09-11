import {MapLayer, withLeaflet} from 'react-leaflet';
import {dynamicMapLayer} from 'esri-leaflet';

type Props = {
  url: string 
} & MapLayerProps

class EsriDynamicMapLayer extends MapLayer<LeafletElement, Props> {
  createLeafletElement(props: Props): LeafletElement {
  	let options = {...props, "f": "image"};
    const el = dynamicMapLayer(
      options
    )
    this.contextValue = { ...props.leaflet, popupContainer: el }
    return el
  }

  updateLeafletElement(fromProps: Props, toProps: Props) {
    if (toProps.url !== fromProps.url) {
      this.leafletElement.setUrl(toProps.url)
    }
  }
}

export default withLeaflet(EsriDynamicMapLayer)
