import {MapLayer, withLeaflet} from 'react-leaflet';
import {featureLayer} from 'esri-leaflet';

type Props = {
  url: string 
} & MapLayerProps

class EsriFeatureLayer extends MapLayer<LeafletElement, Props> {
  createLeafletElement(props: Props): LeafletElement {
  	let options = {...props};
    const el = featureLayer(
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

export default withLeaflet(EsriFeatureLayer)
